#!/bin/bash -x
mkdir -p public # Crée le répertoire pour disposer dans pages de l'application 
source /etc/profile.d/androidrc.sh # Définit les variables d'environnement pour accéder aux outils nécessaires
npm install
npx install expo
npx expo prebuild  # Prépare la génération de l'application native
cd android    # Se place dans le répertoire android
./gradlew assembleRelease # Puis génère l'application au format apk 
cp ./app/build/outputs/apk/release/app-release.apk ../public/monapp.apk # Déplace l'application générée dans /public 
exit 0