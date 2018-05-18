const logger = require('heroku-logger');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const fs = require('fs');

module.exports = async function () {
	// where will our cert live?
	let keypath;

	if (process.env.LOCAL_ONLY_KEY_PATH) {
		// I'm fairly local
		logger.debug('hubAuth...loading local key');
		keypath = process.env.LOCAL_ONLY_KEY_PATH;
	} else {
		// we're doing it in the cloud
		logger.debug('hubAuth...creating cloud key');
		fs.writeFileSync('/app/tmp/server.key', process.env.JWTKEY, 'utf8');
		keypath = '/app/tmp/server.key';
	}

	logger.debug('updating plugin');

	try {
		await exec('sfdx update');
		logger.debug('sfdx core plugin updated');

		const msmResult = await exec('echo y | sfdx plugins:install sfdx-msm-plugin');
		logger.debug(JSON.parse(msmResult).stdout);

		const shaneResult = await exec('echo y | sfdx plugins:install shane-sfdx-plugins');
		logger.debug(JSON.parse(shaneResult).stdout);

		const herokuResult = await exec('heroku update');
		logger.debug(JSON.parse(herokuResult).stdout);

		const authResult = await exec(`sfdx force:auth:jwt:grant --clientid ${process.env.CONSUMERKEY} --username ${process.env.HUB_USERNAME} --jwtkeyfile ${keypath} --setdefaultdevhubusername -a deployBotHub`);
		logger.debug(JSON.parse(authResult).stdout);

	} catch (err){
		logger.error(err);
		throw new Error(err);
	}

	return keypath;
};
