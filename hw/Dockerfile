FROM node:20-bullseye
#ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update --fix-missing && apt-get install jq -y

RUN apt-get install -y apt-utils libccid \
    libpcsclite-dev \
    sudo \
    git \
    autoconf \
    pkg-config \
    libtool \
    help2man \
    automake \
    gcc \
    make \
    build-essential \
    python3 \
    python3-pip \
    swig \
    libssl-dev \
    vim-common \
    cmake \
    vsmartcard-vpcd
RUN pip3 install pytest pycvc cryptography pyscard base58
WORKDIR /
RUN git clone https://github.com/OpenSC/OpenSC
WORKDIR /OpenSC
RUN git checkout tags/0.26.0
RUN ./bootstrap
RUN ./configure --enable-openssl
RUN make -j `nproc`
RUN make install
RUN make clean
RUN ldconfig
WORKDIR /
RUN git clone https://github.com/polhenarejos/pypicohsm.git
RUN pip3 install -e pypicohsm
RUN git clone https://github.com/CardContact/sc-hsm-embedded
WORKDIR /sc-hsm-embedded
RUN autoreconf -fi
RUN ./configure
RUN make -j `nproc`
RUN make install
RUN cp ./src/tests/sc-hsm-pkcs11-test /usr/local/bin/sc-hsm-pkcs11-test
RUN make clean
COPY requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt
COPY sudoers /etc/sudoers
WORKDIR /