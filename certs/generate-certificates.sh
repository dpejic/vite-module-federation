#!/bin/bash

set -e

ROOT_CA_NAME="dpejic-root-ca"
WILDCARD_CERT_NAME="dpejic-wildcard"
WILDCARD_DOMAIN="*.dpejic.local"
GENERATED_DIR="./generated"

print_step() {
    echo "======================================="
    echo "$1"
    echo "======================================="
}

generate_root_ca() {
    print_step "Generating Root CA"

    mkdir -p $GENERATED_DIR

    openssl genrsa -out $GENERATED_DIR/$ROOT_CA_NAME.key 4096

    openssl req -x509 -new -nodes -key $GENERATED_DIR/$ROOT_CA_NAME.key -sha256 -days 90 \
        -config root-ca.conf -out $GENERATED_DIR/$ROOT_CA_NAME.crt

    echo "Root CA generated: $GENERATED_DIR/$ROOT_CA_NAME.crt"
}

generate_wildcard_cert() {
    print_step "Generating Wildcard Certificate for $WILDCARD_DOMAIN"

    openssl genrsa -out $GENERATED_DIR/$WILDCARD_CERT_NAME.key 2048

    openssl req -new -key $GENERATED_DIR/$WILDCARD_CERT_NAME.key -out $GENERATED_DIR/$WILDCARD_CERT_NAME.csr \
        -config wildcard-dpejic-local.conf

    openssl x509 -req -in $GENERATED_DIR/$WILDCARD_CERT_NAME.csr \
        -CA $GENERATED_DIR/$ROOT_CA_NAME.crt -CAkey $GENERATED_DIR/$ROOT_CA_NAME.key -CAcreateserial \
        -out $GENERATED_DIR/$WILDCARD_CERT_NAME.crt -days 90 -sha256 \
        -extfile wildcard-dpejic-local.conf -extensions req_ext

    echo "Wildcard certificate generated: $GENERATED_DIR/$WILDCARD_CERT_NAME.crt"
}

if [ ! -f "$GENERATED_DIR/$ROOT_CA_NAME.crt" ]; then
    generate_root_ca
else
    echo "Root CA already exists. Skipping generation."
fi

generate_wildcard_cert

print_step "Certificates successfully generated!"
echo "Root CA: $GENERATED_DIR/$ROOT_CA_NAME.crt"
echo "Wildcard Certificate: $GENERATED_DIR/$WILDCARD_CERT_NAME.crt"
