# BETTER THEN NOTHING HARDWARE WALLET

## 🚀 TL;DR

**B.T.N.H.W** is a hardware wallet for advanced users and EVM-compatible blockchain developers. Fully opensource, customizable built on   

## 🤔 The reason

Now days the common practice for blockchain developers and adanced users (who develop homegrwn tools to work with a blockchain) is to keep secret keys in ```.env``` files in plain text, configs or software wallets, 
that makes secret keys an low hanging froot for attackers of any kind. B.T.N.H.W was made with intention to fix it (details in security section). 

## 🛠️ How to use

Install **MyProject** using pip (if Python-based) or clone the repository for direct use.



## 🔒 Security 


**B.T.N.H.W** was designed to address the following threats:

    
1. Workstation compromised by automated malware. "Automated malware" refers to an attack where the attacker cannot effectively communicate with the hardware wallet (HW) during the moment of its use.
2. Stolen or lost hardware wallet. The secret key should remain unrecoverable even with full physical access to the hardware wallet.
3. Accidental sharing of the key, such as an accidental push to version control systems.
4. Stolen workstation.

**Why is it only "better than nothing"? What are the risks?**

Since the Raspberry Pi Pico lacks a security enclave to securely store the key in an unexportable manner, all keys on the device must be encrypted. The decryption key is stored on the workstation and is required to make the hardware wallet operational. Thus, there are two main takeaways:

1. If the generated wallet configuration (or the entire workstation) is stolen along with the hardware wallet, the secret key of your wallet is fully compromised — this is game over.
2. If the generated wallet configuration is lost, the hardware wallet becomes useless, and access to the secret key is lost forever.

Since the Raspberry Pi Pico has no screen and mbedTLS (the crypto library) lacks a proper Keccak implementation, the hardware wallet signs the provided hash of a transactio. If an attacker has persistent and complete access to the workstation, they could attempt to sign a malicious hash or substitute data.




## 🛠️ What's inside?

The main building blocks are  

1. [pico-hsm](https://github.com/polhenarejos/pico-hsm)
2. [mbedtls](https://github.com/Mbed-TLS/mbedtls)
3. [RP2040](https://www.raspberrypi.com/documentation/microcontrollers/silicon.html#rp2040)


Pico-hsm firmware makes **RP2040** be a smart card, **pcsd** provides interface to  smart card, **B.T.N.H.W** is a toolsuite that integrates hardhat, smart-card and all needed to create ethereum-compatible signatures. 

All packed into docker container  with all important dependencies. 





