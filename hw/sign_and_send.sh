#!/bin/sh

npx hardhat sign-tnx  --network $net

PIN=$(jq -r '.PIN' $SIGNER_ADDRESS)
ID=$(jq -r '.KEY_ID' $SIGNER_ADDRESS)
sudo service pcscd start
#sudo /usr/local/bin/pkcs11-tool -O

pkcs11-tool --read-object --pin $PIN --id $ID --type pubkey > multisigData/1pub.der
openssl ec -inform DER -outform PEM -in multisigData/1pub.der -pubin -text > multisigData/1pub.pem
openssl ec -inform DER -outform PEM -in multisigData/1pub.der -pubin -text | grep "    " | tr -d ' :\n' | cut -c 3- > multisigData/1pub.eth

pkcs11-tool  --sign --pin $PIN --id $ID --mechanism ECDSA -i multisigData/submit_unsigned_tnx_hash_bin -o multisigData/signature_openssl.der --signature-format openssl
openssl pkeyutl -verify -pubin -inkey multisigData/1pub.pem -in multisigData/submit_unsigned_tnx_hash_bin -sigfile multisigData/signature_openssl.der
pkcs11-tool --sign --pin $PIN --id $ID --mechanism ECDSA -i multisigData/submit_unsigned_tnx_hash_bin -o multisigData/signature.der
openssl pkeyutl -verify -pubin -inkey multisigData/1pub.pem -in multisigData/submit_unsigned_tnx_hash_bin -sigfile multisigData/signature_openssl.der
python3 ./tnxvalid.py

npx hardhat send-signed-tnx $(cat ./multisigData/raw_signed_transaction.hex) $hash --network $net


#./prepare.sh
#
#for line in $(cat ./submits);
#do
#  net=$(echo $line | awk -F "," '{print $1}') ;
#  hash=$(echo $line | awk -F "," '{print $2}') ;
#  echo "===$net submitting $hash==="
#  echo "Signer: $SIGNER_ADDRESS"
#  #npx hardhat show-proposal $hash --network $net
#  npx hardhat submit-proposal-hsm $hash --network $net #--buildonly # -buildOnly
#
#  PIN=$(jq -r '.PIN' $SIGNER_ADDRESS)
#  ID=$(jq -r '.KEY_ID' $SIGNER_ADDRESS)
#  sudo service pcscd start
#  sudo /usr/local/bin/pkcs11-tool -O
#  pkcs11-tool --read-object --pin $PIN --id $ID --type pubkey > multisigData/1pub.der
#  openssl ec -inform DER -outform PEM -in multisigData/1pub.der -pubin -text > multisigData/1pub.pem
#  openssl ec -inform DER -outform PEM -in multisigData/1pub.der -pubin -text | grep "    " | tr -d ' :\n' | cut -c 3- > multisigData/1pub.eth
#
#  pkcs11-tool  --sign --pin $PIN --id $ID --mechanism ECDSA -i multisigData/submit_unsigned_tnx_hash_bin -o multisigData/signature_openssl.der --signature-format openssl
#  openssl pkeyutl -verify -pubin -inkey multisigData/1pub.pem -in multisigData/submit_unsigned_tnx_hash_bin -sigfile multisigData/signature_openssl.der
#  pkcs11-tool --sign --pin $PIN --id $ID --mechanism ECDSA -i multisigData/submit_unsigned_tnx_hash_bin -o multisigData/signature.der
#  openssl pkeyutl -verify -pubin -inkey multisigData/1pub.pem -in multisigData/submit_unsigned_tnx_hash_bin -sigfile multisigData/signature_openssl.der
#  python3 ./tnxvalid.py
#  npx hardhat send-signed-proposal-hsm $(cat ./multisigData/raw_signed_transaction.hex) $hash --network $net
#
#
#done