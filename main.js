import promptSync from 'prompt-sync';
import {displayMenu} from './menu.js';

const prompt = promptSync();

export const riceCooker = {
    isRicePresent: false,
    isRiceCooked: false,
    isSteamingInProgress: false,
    isHeatingInProgress: false,

    addRice() {
        if (!this.isRicePresent) {
            this.isRicePresent = true;
            console.log('Rice has been added.');
        } else {
            console.log("There's already rice in the rice cooker.");
        }
    },

    cookRice() {
        if (this.isRicePresent && !this.isRiceCooked) {
            console.log('Cooking rice...');
            this.delaySync(1500);
            this.isRiceCooked = true;
            console.log('The rice has been cooked!');
        } else if (!this.isRicePresent) {
            console.log('Cannot cook. The rice cooker is empty.');
        } else {
            console.log('The rice is already cooked.');
        }
    },

    steam() {
        if (this.isRicePresent && !this.isSteamingInProgress) {
            console.log('Steaming in progress...');
            this.isSteamingInProgress = true;
            this.delaySync(1500);
            this.isSteamingInProgress = false;
            console.log('Steaming completed!');
        } else if (!this.isRicePresent) {
            console.log('Cannot steam. The rice cooker is empty.');
        } else {
            console.log('Steaming is already in progress.');
        }
    },

    keepWarm() {
        if (this.isRicePresent && this.isRiceCooked && !this.isHeatingInProgress) {
            console.log('The rice is now being kept warm.');
            this.isHeatingInProgress = true;
        } else if (!this.isRicePresent) {
            console.log('Cannot keep warm. The rice cooker is empty.');
        } else if (!this.isRiceCooked) {
            console.log('Cannot keep warm. The rice is not cooked.');
        } else {
            console.log('Keeping warm is already in progress.');
        }
    },

    removeRice() {
        if (this.isRicePresent && (this.isRiceCooked || this.isHeatingInProgress)) {
            this.isRicePresent = false;
            this.isRiceCooked = false;
            this.isSteamingInProgress = false;
            this.isHeatingInProgress = false;
            console.log('The rice has been removed from the rice cooker.');
        } else {
            console.log("There's no rice to remove or it is not cooked yet.");
        }
    },

    delaySync(ms) {
        const start = Date.now();
        while (Date.now() - start < ms) {
        }
    },
};

const COMMANDS = {
    addRice: 1,
    cook: 2,
    steam: 3,
    keepWarm: 4,
    removeRice: 5,
    exit: 6,
}

export function simulateRiceCooker() {
    while (true) {
        displayMenu();
        let input = prompt('Enter your choice: ');
        const choice = parseInt(input, 10);

        if (choice === COMMANDS.exit) {
            console.log('Thank you for using the Rice Cooker Simulator. Goodbye!');
            break;
        }

        switch (choice) {
            case COMMANDS.addRice:
                riceCooker.addRice();
                break;
            case COMMANDS.cook:
                riceCooker.cookRice();
                break;
            case COMMANDS.steam:
                riceCooker.steam();
                break;
            case COMMANDS.keepWarm:
                riceCooker.keepWarm();
                break;
            case COMMANDS.removeRice:
                riceCooker.removeRice();
                break;
            default:
                console.log('Invalid choice. Please select a valid option.');
        }

    }
}

simulateRiceCooker();
