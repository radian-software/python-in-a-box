FROM radiansoftware/sleeping-beauty:v4.0.0 AS sleepingd

# EOL April 2027
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y g++ make nodejs python3 tini && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm ci

COPY index.html server.js /src/

COPY --from=sleepingd /sleepingd /usr/local/bin/sleepingd
ENTRYPOINT ["/usr/bin/tini", "--"]

ENV SLEEPING_BEAUTY_COMMAND="PORT=8080 node server.js"
ENV SLEEPING_BEAUTY_TIMEOUT_SECONDS=60
ENV SLEEPING_BEAUTY_COMMAND_PORT=8080
ENV SLEEPING_BEAUTY_LISTEN_PORT=8081

RUN useradd -p '!' -m -l pythoninabox

CMD ["sleepingd"]
USER pythoninabox
EXPOSE 8081
