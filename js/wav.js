function pcmToWav(pcm, sampleRate = 22050) {
    const buffer = new ArrayBuffer(44 + pcm.length * 2);
    const view = new DataView(buffer);

    function writeStr(o, s) {
        for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i));
    }

    let o = 0;
    writeStr(o, "RIFF"); o += 4;
    view.setUint32(o, 36 + pcm.length * 2, true); o += 4;
    writeStr(o, "WAVE"); o += 4;
    writeStr(o, "fmt "); o += 4;
    view.setUint32(o, 16, true); o += 4;
    view.setUint16(o, 1, true); o += 2;
    view.setUint16(o, 1, true); o += 2;
    view.setUint32(o, sampleRate, true); o += 4;
    view.setUint32(o, sampleRate * 2, true); o += 4;
    view.setUint16(o, 2, true); o += 2;
    view.setUint16(o, 16, true); o += 2;
    writeStr(o, "data"); o += 4;
    view.setUint32(o, pcm.length * 2, true); o += 4;

    let idx = 44;
    for (let i = 0; i < pcm.length; i++, idx += 2) {
        let s = Math.max(-1, Math.min(1, pcm[i]));
        view.setInt16(idx, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([buffer], { type: "audio/wav" });
}
