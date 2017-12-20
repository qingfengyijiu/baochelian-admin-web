var config = {
    base: {
        protocol: 'http',
        domain: '47.94.1.230:8080'
    },
    dev: {
	    //domain: 'core.91bcl.com'
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
