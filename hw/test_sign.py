from picohsm import PicoHSM
from cryptography.hazmat.primitives.asymmetric import ec
from binascii import unhexlify
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
import platform
import sys

class SecureLock2:
    def __init__(self, picohsm, secretkey):
        self.picohsm = picohsm
        self.secretkey = secretkey

    def mse(self):
        sk = ec.generate_private_key(ec.SECP256R1())
        pn = sk.public_key().public_numbers()
        self.__pb = sk.public_key().public_bytes(Encoding.X962, PublicFormat.UncompressedPoint)

        ret = self.picohsm.send(cla=0x80, command=0x64, p1=0x3A, p2=0x01, data=list(self.__pb))

        pk = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), bytes(ret))
        shared_key = sk.exchange(ec.ECDH(), pk)

        xkdf = HKDF(
            algorithm=hashes.SHA256(),
            length=12+32,
            salt=None,
            info=self.__pb
        )
        kdf_out = xkdf.derive(shared_key)
        self.__key_enc = kdf_out[12:]
        self.__iv = kdf_out[:12]

    def encrypt_chacha(self, data):
        chacha = ChaCha20Poly1305(self.__key_enc)
        ct = chacha.encrypt(self.__iv, data, self.__pb)
        return ct

    def unlock_device(self):

        ct = self.get_skey()

        self.picohsm.send(cla=0x80, command=0x64, p1=0x3A, p2=0x03, data=list(ct))

    def _get_key_device(self):
        return self.secretkey

    def get_skey(self):
        self.mse()
        ct = self.encrypt_chacha(self._get_key_device())
        return ct

    def enable_device_aut(self):
        ct = self.get_skey()
        self.picohsm.send(cla=0x80, command=0x64, p1=0x3A, p2=0x02, data=list(ct))

    def disable_device_aut(self):
        ct = self.get_skey()
        self.picohsm.send(cla=0x80, command=0x64, p1=0x3A, p2=0x04, p3=list(ct))

curve=ec.SECP256K1
secret_key=unhexlify('7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6')
pkey = ec.derive_private_key(
    int.from_bytes(secret_key, byteorder='big'),
    curve(),  # Curve used in Ethereum
)
DEFAULT_DKEK = bytes([0x1] * 32)
print(pkey)
device = PicoHSM()
device.initialize(dkek_shares=1)

device.import_dkek(DEFAULT_DKEK)
key_id = device.import_key(pkey, dkek=DEFAULT_DKEK)
print(key_id)
pubkey = device.public_key(key_id, param=curve().name)
print(pubkey)
slck = SecureLock2(device,secret_key)
slck.enable_device_aut()
slck.unlock_device()
pubkey = device.public_key(key_id, param=curve().name)
print(pubkey)

#signature=device.sign(keyid=key_id,data=secret_key,scheme=0x70)
#print(signature)