const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const inputPath = 'art_of_war_01-02_sun_tzu.ogg'; //Input file Path with Extension
const outputPath = 'output.mp3'; //Output File Path with Extension
const seconds = 300; //Trim Time in seconds
const fadeInOut = true;
let fadeInOutTime = seconds - 1;
const setStartTime = 0; // Start Time
ffmpeg.setFfmpegPath(ffmpegPath);
let audioFilters = []; // Initilizing the Filter
const convert = new ffmpeg({ source: inputPath });

// Conversion of Audio with different options.
try {
	// Check if File Exist or Not
	if (fs.existsSync(inputPath)) {
		//Work if fadeInOut is true.
		if (fadeInOut) {
			audioFilters = [
				{
					filter: 'afade',
					options: 't=out:st=' + fadeInOutTime + ':d=1'
				}
			];
		} else {
			audioFilters = [];
		}
		// Convert the audio with functionality and output the new File.
		convert
			.setStartTime(setStartTime) //Can be in "HH:MM:SS" format also
			.setDuration(seconds)
			.audioFilters(audioFilters)
			.on('start', function(command) {
				console.log('Actual command Executed: ' + command);
			})
			.on('error', function(err) {
				console.log('error: ', +err);
			})
			.on('end', function(err) {
				if (!err) {
					console.log('conversion Done and file saved at: ', outputPath);
				}
			})
			.saveToFile(outputPath);
	} else {
		throw "File Doesn't Exist";
	}
} catch (err) {
	console.error(err);
}
