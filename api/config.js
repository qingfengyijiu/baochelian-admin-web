var config = {
    base: {
        protocol: 'http',
        domain: 'core.91bcl.com'
    },
    dev: {
        //domain: '172.16.100.209:9000'
        //domain: '192.168.1.25:9000'   //xue rui
    },
    test: {

    },
    production: {
        //domain: 'core.91bcl.com'
        //domain: '172.16.1.42:8080'
    },
    dev_cp: {

    }
};

for(var p in config.base) {
    config['dev'][p] = config['dev'][p] ? config['dev'][p] : config['base'][p];
    config['test'][p] = config['test'][p] ? config['test'][p] : config['base'][p];
    config['production'][p] = config['production'][p] ? config['production'][p] : config['base'][p];
    config['dev_cp'][p] = config['dev_cp'][p] ? config['dev_cp'][p] : config['base'][p];
}

module.exports = config;
