const logger = require('heroku-logger');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const fs = require('fs');

module.exports = async function () {
	// where will our cert live?
	let keypath;

	if (process.env.LOCAL_ONLY_KEY_PATH) {
		// I'm fairly local
		logger.debug('pool...loading local key');
		keypath = process.env.LOCAL_ONLY_KEY_PATH;
	} else {
		// we're doing it in the cloud
		logger.debug('pool...creating cloud key');
		fs.writeFileSync('/app/tmp/server.key', process.env.JWTKEY, 'utf8');
		keypath = '/app/tmp/server.key';
	}

	logger.debug('updating plugin');

	try {
		await exec('sfdx update');
		logger.debug('sfdx core plugin updated');

		const msmResult = await exec('echo y | sfdx plugins:install sfdx-msm-plugin');
		logger.debug(msmResult);

		const shaneResult = await exec('echo y | sfdx plugins:install shane-sfdx-plugins');
		logger.debug(shaneResult);

		const herokuResult = await exec('heroku update');
		logger.debug(herokuResult);

		const authResult = await exec(`sfdx force:auth:jwt:grant --clientid ${process.env.CONSUMERKEY} --username ${process.env.HUB_USERNAME} --jwtkeyfile ${keypath} --setdefaultdevhubusername -a deployBotHub`);
		logger.debug(authResult);

	} catch (err){
		logger.error(err);
		throw new Error(err);
	}

	return keypath;
};
