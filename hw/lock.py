import pytest
import hashlib
import os
import binascii
import random
import json
import os

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
from lib.bnthw import SecureLock2




device_config = Config()
device_config.loadConfig(os.getenv('SIGNER'))

device = PicoHSM(device_config.PIN)
slck = SecureLock2(device,device_config.HSM_ACCESS_KEY)
slck.unlock_device()
