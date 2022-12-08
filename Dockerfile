# Uporabimo alpine distribucijo
FROM node:18-alpine
# Kopiramo source kodo
COPY / ./
# nastavimo timezone https://wiki.alpinelinux.org/wiki/Setting_the_timezone
RUN apk update && apk upgrade && apk add --no-cache bash git openssh tzdata  &&\
cp /usr/share/zoneinfo/Europe/Brussels /etc/localtime && echo "Europe/Ljubljana" > /etc/timezone
# namestimo pakete
RUN npm i -g npm && npm install --only=production

# Določimo kaj naj se zažene 
ENTRYPOINT ["node", "index.js"]
# Add this to the command line parms unless overwritten by the run command
# CMD ["--file", "./properties/env-properties.json"]


