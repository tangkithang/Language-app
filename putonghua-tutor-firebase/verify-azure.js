import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Azure Speech Service Key Verification");
console.log("-------------------------------------");

rl.question('Enter your Subscription Key: ', (key) => {
    rl.question('Enter your Service Region (e.g., eastasia): ', (region) => {

        console.log(`\nTesting credentials for region: ${region}...`);

        try {
            const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
            const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null); // Null audio config to avoid playback

            console.log("Attempting to synthesize dummy text to verify authentication...");

            synthesizer.speakTextAsync(
                "Verification test.",
                (result) => {
                    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                        console.log("\nSUCCESS! Your keys are valid.");
                    } else {
                        console.error("\nFAILED: Unable to verify keys.");
                        console.error("Error details:", result.errorDetails);
                    }
                    synthesizer.close();
                    rl.close();
                },
                (error) => {
                    console.error("\nERROR: " + error);
                    synthesizer.close();
                    rl.close();
                }
            );

        } catch (e) {
            console.error("\nEXCEPTION:", e);
            rl.close();
        }
    });
});
