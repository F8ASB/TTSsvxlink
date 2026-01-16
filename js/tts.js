const PiperTTS = (() => {
    let ready = false;
    let sampleRate = 22050; // à ajuster selon le modèle
    let synthFn = null;

    async function init(opts) {
        // opts.modelUrl, opts.configUrl
        // Ici tu branches sur la lib Piper WASM que tu utilises.
        // Exemple conceptuel :

        // const module = await SomePiperWasmLib.load({
        //     modelUrl: opts.modelUrl,
        //     configUrl: opts.configUrl
        // });
        // synthFn = text => module.synthesize(text); // retourne Float32Array
        // sampleRate = module.sampleRate;

        // Pour l’instant, on met un stub pour que tu voies la structure :
        throw new Error("Brancher ici la lib Piper WASM choisie.");
    }

    async function synthesize(text) {
        if (!synthFn) throw new Error("PiperTTS non initialisé.");
        const pcm = await synthFn(text);
        return pcm;
    }

    return {
        init,
        synthesize,
        get sampleRate() { return sampleRate; }
    };
})();
