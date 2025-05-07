import Quagga from "https://esm.sh/@ericblade/quagga2@1.2.6";

document.getElementById("isbn").value = "準備中";
Quagga.init({
    inputStream: {
        type: "LiveStream",
        target: document.querySelector("#scanner"),
        constraints: {
            facingMode: "environment",
        },
    },
    decoder: {
        readers: ["ean_reader"],
    },
}, function (err) {
    if (err) {
        console.error("Error💥:", err);
        return;
    }
    Quagga.start();
});

Quagga.onDetected((result) => {
    const code = result.codeResult.code;
    document.getElementById("isbn").value = code;
    console.log("Scan: ", code);
});
