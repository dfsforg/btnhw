from eth_account import Account
from eth_utils import keccak
import binascii
import json
#from sha3 import keccak_256

from eth_account._utils.typed_transactions import (
    TypedTransaction,
)

from eth_account._utils.legacy_transactions import (
    Transaction,
    vrs_from,
    assert_valid_fields,
    serializable_unsigned_transaction_from_dict,
    encode_transaction
)

import rlp
from web3 import Web3
from hexbytes import HexBytes
from eth_account.messages import encode_defunct
from eth_account._utils.legacy_transactions import Transaction, UnsignedTransaction
from eth_account import Account
from eth_keys import KeyAPI
from eth_utils import keccak
from web3 import Web3
import ecdsa
from eth_utils import keccak
from ecdsa.util import sigdecode_der
import binascii
from ecdsa import VerifyingKey, SECP256k1
from ecdsa.util import sigencode_der
import hashlib
from eth_account.messages import (
    SignableMessage,
    _hash_eip191_message,
    encode_typed_data,
    encode_defunct
)
from eth_utils import decode_hex
from eth_keys import keys

CHAIN_ID_OFFSET = 35
V_OFFSET = 27

def binary_to_hex(data):
    # Read binary data from the file

    # Convert binary data to hexadecimal string
    hex_string = binascii.hexlify(data).decode('utf-8')

    return hex_string

class NoHash:
    def __init__(self, data):
        self._data = data
        self.name = "None"

    def digest(self):
        return self._data

def no_hash(data):
    return NoHash(data)

def bytes_to_int(byte_sequence):
    return int.from_bytes(byte_sequence, byteorder='big')

def to_eth_v(v_raw, chain_id=None):
    if chain_id is None:
        v = v_raw + V_OFFSET
    else:
        v = v_raw + CHAIN_ID_OFFSET + 2 * chain_id
    return v

def validate_signature(public_key_hex, message, signature_hex):
    # Convert the public key hex string to a public key object
    # Convert the public key hex string to bytes
    public_key_bytes = bytes.fromhex(public_key_hex)

    # Create a PublicKey object using eth_keys
    public_key = KeyAPI.PublicKey(public_key_bytes)

    addr = keccak(public_key_bytes)[-20:]

    # print('private_key:', private_key.hex())
    print('eth addr: 0x' + addr.hex())

    message=encode_defunct(message)

    #message_hash = keccak(message)
    # Hash the binary message
    #message_hash = message

    w3 = Web3(Web3.HTTPProvider(""))
    # Verify the signature
    #recovered_address = Account.recover_message(message_hash, signature=signature_hex)
    #recovered_address


    recovered_address = w3.eth.account.recover_message(message,signature=HexBytes(signature_hex))
    print(recovered_address)

    # Validate the recovered address matches the address derived from the public key
    #s_valid = recovered_address.lower() == public_key.address.lower()

    return 1

# Example public key, message, and signature (replace these with your actual values)
#public_key_hex = 'fdef26ea6a86575b4d1b643bfd84a5bd573394467bc09380f20e57ca1ee9261dad0c12c208d51bda778e5accbb82533928b0bb77c0ac9ed34ba76ef39a8cfd7e'  # Public key in hex format

def recover_address(r,s,raw_unsigned_transaction,rec_id,chain_id):

    #raw_transaction_bytes=bytes.fromhex(message[2:])
    raw_transaction_bytes = decode_hex(raw_unsigned_transaction)
    #transaction = Transaction.from_bytes(raw_transaction_bytes)

    tnx_hash = keccak(raw_transaction_bytes)
    #v = to_eth_v(rec_id,int(chain_id))
    #
    # Reconstruct the public key from the signature
    recovered_public_key = keys.ecdsa_recover(tnx_hash, keys.Signature(vrs=(rec_id, r, s)))

    # Convert the public key to an Ethereum address
    recovered_address = Web3.to_checksum_address(recovered_public_key.to_address())
    #from eth_account._utils.legacy_transactions import UnsignedTransaction
    #UnsignedTransaction = Transaction.exclude(['v', 'r', 's'])



    if len(raw_transaction_bytes) > 0 and raw_transaction_bytes[0] <= 0x7F:
        # We are dealing with a typed transaction.
        unsigned_transaction = TypedTransaction.from_bytes(HexBytes(raw_transaction_bytes))
        print("TYPED")
    else:
        unsigned_transaction = Transaction.from_bytes(raw_transaction_bytes)
        print("LEGACY")

    #unsigned_transaction = rlp.decode(raw_transaction_bytes,Transaction)

    v = int(chain_id)*2+35+rec_id
    #v = 27
    #print(unsigned_transaction)

    #     signed_transaction = {
    #             'nonce': unsigned_transaction.nonce,
    #             'gasPrice': unsigned_transaction.gasPrice,
    #             'gas': unsigned_transaction.gas,
    #             'to': unsigned_transaction.to,
    #             'value': unsigned_transaction.value,
    #             'data': unsigned_transaction.data,
    #         }

    signed_transaction = UnsignedTransaction(
        nonce=unsigned_transaction.nonce,
        gasPrice=unsigned_transaction.gasPrice,
        gas=unsigned_transaction.gas,
        to=unsigned_transaction.to,
        value=unsigned_transaction.value,
        data=unsigned_transaction.data,
        #         v=v,
        #         r=r,
        #         s=s
    )

    signed_transaction_bytes = encode_transaction(signed_transaction, (v, r, s))
    #print(serializable_unsigned_transaction_from_dict(signed_transaction))
    #assert_valid_fields(signed_transaction)
    #print(signed_transaction)
    #signed_transaction_bytes = rlp.encode(signed_transaction)
    signed_transaction_hex = signed_transaction_bytes.hex()
    #print(signed_transaction_hex)
    return recovered_address, signed_transaction_hex


def get_recovery_id(raw_unsigned_transaction, signature, public_key_bytes):
    # Convert the public key hex string to bytes
    #public_key_bytes = bytes.fromhex(public_key_hex)

    # Create a PublicKey object using ecdsa
    #verifying_key = ecdsa.VerifyingKey.from_string(public_key_bytes[1:], curve=ecdsa.SECP256k1)
    verifying_key = ecdsa.VerifyingKey.from_der(public_key_bytes,hashfunc=no_hash)
    # Hash the message


    #message_encoded = encode_defunct(message)
    #message_hash = _hash_eip191_message(message_encoded)

    #message_hash = keccak(bytes.fromhex(message[2:]))
    tnx_hash = keccak(decode_hex(raw_unsigned_transaction))
    print("0x"+binascii.hexlify(tnx_hash).decode('utf-8'))
    #message_hash = keccak(bytes.fromhex("f902608080809491b1b03d177687044202206caec87357fa6a01c880b902446a76120200000000000000000000000091b1b03d177687044202206caec87357fa6a01c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000440d582f13000000000000000000000000488c818ca8b9251b393131c08a736a67ccb19297000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004173430429c7b1e274c5e616c4c39d538f5e0899c06b918e027ce716df41410ad5c1654ce69e536ece355f49695177d38f149512750c6eb83cf32a855d1dd850511f00000000000000000000000000000000000000000000000000000000000000"))

    #
    # Assuming the signature is 64 bytes long (32 bytes for r and 32 bytes for s)
    assert len(signature) == 64, "Signature length should be 64 bytes"

    # Split the signature into r and s components
    r = bytes_to_int(signature[:32])
    s = bytes_to_int(signature[32:])

    #EIP-2
    #https://github.com/aws-samples/aws-kms-ethereum-accounts/blob/1c11d368fd1e00f08d744acc07bbddf5a0ed5e45/aws_kms_lambda_ethereum/_lambda/functions/eth_client/lambda_helper.py#L129
    #https://eips.ethereum.org/EIPS/eip-2
    #https://www.secg.org/sec2-v2.pdf
    SECP256_K1_N = int("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16)
    secp256_k1_n_half = SECP256_K1_N / 2
    if s > secp256_k1_n_half:
        s = SECP256_K1_N - s

    #repacking signature
    signature_der = sigencode_der(r, s, ecdsa.SECP256k1.order,)

    # Decode the DER signature
    r, s = ecdsa.util.sigdecode_der(signature_der, ecdsa.SECP256k1.order,)




    # Calculate the recovery ID
    recovery_id = None
    for rec_id in range(4):
        try:
            rec_pub_key = ecdsa.VerifyingKey.from_public_key_recovery(
                signature=signature_der,
                data=tnx_hash,
                curve=SECP256k1,
                hashfunc=no_hash,
                sigdecode=sigdecode_der,
                #recovery_param=recovery_id
            )
            print(binary_to_hex(rec_pub_key[rec_id].to_string()),binary_to_hex(verifying_key.to_string()))
            #print(binary_to_hex(rec_pub_key[1].to_string()))
            #print(binary_to_hex(verifying_key.to_string()))
            if binary_to_hex(rec_pub_key[rec_id].to_string()) == binary_to_hex(verifying_key.to_string()):
                recovery_id = rec_id
                break
        except ecdsa.BadSignatureError:
            continue

    if recovery_id is None:
        raise ValueError("Could not find the correct recovery ID.")


    return r, s, recovery_id

# with open("1.eth", 'rb') as binary_file:
#         public_key_hex = binary_file.read()
#

with open("./tmp/unsigned_tnx_bin", 'r') as binary_file:
    raw_unsigned_transaction = binary_file.read()

with open("./tmp/chain_id", 'r') as binary_file:
    chain_id = binary_file.read()

with open('./tmp/signature.der', 'rb') as binary_file:
    signature = binary_file.read()

with open('./tmp/1pub.der', 'rb') as binary_file:
    public_key_bytes = binary_file.read()
#public_key_bytes = open("1pub.der", "rb").read()
#public_key_hex = '04c9ea93d9b871e74a1b7a4d128f845ec0a6352ef244097ce69133fd38d065fe8bda538b4f274aa900af0940a671bffc48f4c859097e46fc6bf8ed02b7abb5c392'

r, s, recovery_id = get_recovery_id(raw_unsigned_transaction, signature, public_key_bytes)
print(r, s, recovery_id)

address,signed_transaction = recover_address(r,s,raw_unsigned_transaction,recovery_id,chain_id)

# with open("./cli_cache/"+"0x"+binascii.hexlify(message).decode('utf-8')+".signatures.json", 'w') as binary_file:
#     signed_proposal = {address:"0x"+binascii.hexlify(safe_signature).decode('utf-8')}
#     binary_file.write(json.dumps(signed_proposal))
#     #public_key_bytes = binary_file.read()

with open("./tmp/raw_signed_transaction.hex", 'w') as binary_file:
    #signed_proposal = {address:"0x"+binascii.hexlify(safe_signature).decode('utf-8')}
    binary_file.write("0x"+signed_transaction)
    #public_key_bytes = binary_file.read()

#print("0x"+ binascii.hexlify(safe_signature).decode('utf-8'))
print("RECOVERED ADDRESS: "+ address, "SIGNED TRANSACTION: ",signed_transaction)
#print("VALID SAFE SIGNATURE: 0x"+ binascii.hexlify(safe_signature).decode('utf-8'), "REC_ID: ",recovery_id)