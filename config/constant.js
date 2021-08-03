module.exports.constant = {
    token: {
        SECRET: 'Hp$,z#+)eTU6pVF`',
        EXPIRATION: '24h',
    },

    media: {
        thumbnails: [{
                name: 'medium',
                width: 256,
                height: 256,
            },

            {
                name: 'small',
                width: 128,
                height: 128,
                mode: {
                    type: 'scaleToFit',
                },
            },

            {
                name: 'max',
                width: 500,
                height: 400,
                mode: {
                    type: 'scaleToFit',
                },
            },
        ],
    },
};