# ChipFox Client
This package provides an API client for accesing devices data over ChipFox API

Important note: In addition to user and password, UUID is required and you should ask for one to ChipFox.

## Install
Quick and simple:

```shell
npm i ts-chipfox-client
```

## Usage
Let's learn by example. This code logs into you ChipFox's account, list devices and show last 5 positions from the first returned device:

```typescript
const api = new ChipFoxClient('your-username', 'your-password', 'your-uuid');

try {

    const loginData = await api.login();
    console.log(`Hi ${loginData.name} ${loginData.surname}! (${loginData.email})\n`);
    
    const devices = await api.getDevices();
    console.log(`Devices:`);
    devices.map( (device:Device) => { console.log(`\t - ${device.name} (${device.id}): ${device.lat}, ${device.lng} @ ${device.lastSeen}`) } );
    
    const positions = await api.getDevicePositions(devices[0].id, {limit: 5});
    console.log(`\nLast ${positions.length} positions:`);
    positions.map( (position:Position) => { console.log(`\t- ${position.computedLocation.lat}, ${position.computedLocation.lng} \t\t@ ${position.time}`) } );

} catch(error) {
    console.log('Error loading data!');
}
```

It's promised base so you can also build your own callback hell, in case you like it that way:

```typescript
const api = new ChipFoxClient('your-username', 'your-password', 'your-uuid');

api.login()
    .then((loginData) => {

        console.log(`Hi ${loginData.name} ${loginData.surname}! (${loginData.email})\n`);
        api.getDevices()
            .then((devices) => {

                console.log(`Devices:`);
                devices.map( (device:Device) => { console.log(`\t - ${device.name} (${device.id}): ${device.lat}, ${device.lng} @ ${device.lastSeen}`) } );
                api.getDevicePositions(devices[0].id, {limit: 5})
                    .then(positions => {
                        console.log(`\nLast ${positions.length} positions:`);
                        positions.map( (position:Position) => { console.log(`\t- ${position.computedLocation.lat}, ${position.computedLocation.lng} \t\t@ ${position.time}`) } );
                    })
                    .catch(error => console.log('Error getting positions!'));

            })
            .catch(error => console.log('Error getting devices!'));

    })
    .catch(error => console.log('Error logging in!'));
```

## Development
Use the scripts defined in `package.json`:

* Generate docs: ```npm run gendocs```
* Build: ```npm run build```


## Documentation
You can have a look at the generated docs [here](docs/globals.md).