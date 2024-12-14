import pytest
import hashlib
import os
import sys
import binascii
import json
import random
from picohsm import DOPrefixes
from cryptography.hazmat.primitives.asymmetric import rsa, ec, x25519, x448
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
from picohsm.const import DEFAULT_RETRIES, DEFAULT_DKEK_SHARES
#from const import DEFAULT_DKEK
from picohsm import PicoHSM
from eth_account import Account


from binascii import unhexlify
import secrets

from lib.bnthw import Config
from lib.bnthw import InitDevice


if len(sys.argv) < 3:
    force_init = False
    testkey = False
else:
    if sys.argv[1] == "0":
        force_init = False
    else:
        force_init = True

    #print(sys.argv[2])
    if sys.argv[2] == "0":
        testkey = False
    else:
        testkey = sys.argv[2]

device_config = Config(testkey)
print(InitDevice(device_config,force_init))

