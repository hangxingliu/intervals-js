#!/usr/bin/env bash


set -x;
yarn run clean || exit 1;
yarn run build:publish || exit 1;
