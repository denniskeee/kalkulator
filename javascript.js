"use strict"
let csokkentes = 0; // Új változó a csökkentés tárolására
function osszegzes() {
    let kijeloltSorok = document.getElementsByClassName("kijelolt");
    let maxBorton = 0;
    let minBorton = 0;
    let minBirsag = 0;
    let maxBirsag = 0;
    let elsoCellakErteke = Array.from(kijeloltSorok, sor => sor.cells[0].innerText).join(", ");
    let felezes = false;
    let vanKijeloles = kijeloltSorok.length > 0;
    let vanOvadek = true;
    
    
    for (var i = 0; i < kijeloltSorok.length; i++) {
        let sor = kijeloltSorok[i];
        if (!sor.cells[1] || !sor.cells[1].innerText.includes("(Óvadék lehetősége)")) {
            vanOvadek = false;
            break; 
        }
    }

    for (var i = 0; i < kijeloltSorok.length; i++) {
        let sor = kijeloltSorok[i];

        if (sor.cells[0].innerText.trim() === "4(06)") {
            felezes = true;
            continue;
        }

        function tableCell(szam) {
            let cellaTartalom = sor.cells[szam].textContent.trim();
            let percElem = sor.cells[szam].querySelector('.perc');
            if (percElem) {
                let szam = parseInt(percElem.textContent.trim().replace(/\s/g, '').match(/\d+/)?.[0] || "0", 10);
                return szam;
            } else {
                return parseInt(cellaTartalom.replace(/[^\d]/g, ''));
            }
        }

        let harmadik = tableCell(3);

        if (sor.cells.length < 4) {
            continue;
        }
        else if (sor.cells.length == 5 && harmadik > 420) {
            let minB = tableCell(2)
            let maxB = tableCell(3)
            let borton = tableCell(4)
            if (!isNaN(minB) && !isNaN(maxB)) {
                minBirsag += minB;
                maxBirsag += maxB;
            }
            if (!isNaN(borton)) {
                if (borton > maxBorton) {
                    maxBorton = borton;
                    minBorton = borton;
                }
            }
        }
        else if (sor.cells.length == 6) {
            let minB = tableCell(2)
            let maxB = tableCell(3)
            let minBo = tableCell(4)
            let maxBo = tableCell(5)
            if (!isNaN(minB) && !isNaN(maxB)) {
                minBirsag += minB;
                maxBirsag += maxB;
            }
            if (!isNaN(minBo) && !isNaN(maxBo)) {
                if (minBo.length > 1 && maxBo.length > 1) {
                    minBorton = minBo;
                    maxBorton = maxBo;
                }
                if (maxBo > maxBorton) {
                    maxBorton = maxBo;
                }

                if (minBo > minBorton) {
                    minBorton = minBo;
                }

            }
        }
        else if (sor.cells.length == 5 && sor.cells[2].getAttribute('contenteditable') === "true") {
            let osszeg = tableCell(2) * tableCell(1);
            let minBo = tableCell(3)
            let maxBo = tableCell(4)
            let maxOsszeg = parseInt(sor.cells[1].textContent.match(/\$([0-9,]+)/)?.[1].replace(/,/g, '')) * 1000;
            let vanE = sor.cells[1].textContent.includes("max");
            if (!isNaN(osszeg) && (maxOsszeg > osszeg || !vanE)) {
                minBirsag += osszeg
                maxBirsag += osszeg
            }
            else if (!isNaN(osszeg)) {
                minBirsag += maxOsszeg
                maxBirsag += maxOsszeg
            }
            if (!isNaN(minBo) && !isNaN(maxBo)) {
                if (minBo.length > 1 && maxBo.length > 1) {
                    maxBorton = maxBo;
                    minBorton = minBo;
                }
                if (maxBo > maxBorton) {
                    maxBorton = maxBo;
                }
                if (minBo > minBorton) {
                    minBorton = minBo;
                }
            }
        }
        else if (sor.cells.length == 5 && harmadik <= 420) {
            let birsag = tableCell(2)
            let minBo = tableCell(3)
            let maxBo = tableCell(4)
            if (!isNaN(birsag)) {
                minBirsag += birsag;
                maxBirsag += birsag;
            }
            if (!isNaN(minBo) && !isNaN(maxBo)) {
                if (minBo.length > 1 && maxBo.length > 1) {
                    maxBorton = maxBo;
                    minBorton = minBo;
                }
                if (maxBo > maxBorton) {
                    maxBorton = maxBo;
                }
                if (minBo > minBorton) {
                    minBorton = minBo;
                }
            }
        }
        else if (sor.cells.length == 4 && sor.cells[2].getAttribute('contenteditable') === "true") {
            let osszeg = tableCell(2) * tableCell(1);
            let borton = tableCell(3);
            let maxOsszeg = parseInt(sor.cells[1].textContent.match(/\$([0-9,]+)/)?.[1].replace(/,/g, '')) * 1000;
            let vanE = sor.cells[1].textContent.includes("max");
            if (!isNaN(osszeg) && (maxOsszeg > osszeg || !vanE)) {
                minBirsag += osszeg
                maxBirsag += osszeg
            }
            else if (!isNaN(osszeg)) {
                minBirsag += maxOsszeg
                maxBirsag += maxOsszeg
            }
            if (!isNaN(borton)) {
                if (borton > maxBorton) {
                    maxBorton = borton;
                    minBorton = borton
                }
                else if (borton > minBorton) {
                    minBorton = borton
                }
            }
        }
        else if (sor.cells.length == 4) {
            let birsag = tableCell(2)
            let borton = tableCell(3)
            if (!isNaN(birsag)) {
                minBirsag += birsag;
                maxBirsag += birsag;
            }
            if (!isNaN(borton)) {
                if (borton > maxBorton) {
                    maxBorton = borton;
                    minBorton = borton
                }
                else if (borton > minBorton) {
                    minBorton = borton
                }
            }
        }
    }
    minBorton -= minBorton * csokkentes;
    maxBorton -= maxBorton * csokkentes;

    if (felezes) {
        maxBorton /= 2;
        minBorton /= 2;
        minBirsag /= 2;
        maxBirsag /= 2;
    }
    if (vanOvadek && vanKijeloles) {
        document.querySelector(".ovadek").style.display = "block";
    } else {
        document.querySelector(".ovadek").style.display = "none";
    }
    
    document.getElementById("elsoCellakErteke").textContent = elsoCellakErteke.replace(/,\s*$/, '');
    document.getElementById("maxJailPerc").textContent = Math.min(maxBorton, 300);
    document.getElementById("minJailPerc").textContent = Math.min(minBorton, 300);
    document.getElementById("minBirsag").textContent = Math.min(minBirsag, 300000);
    document.getElementById("maxBirsag").textContent = Math.min(maxBirsag, 300000);
    
}

document.querySelectorAll('.opciok').forEach(inputElem => {
    inputElem.addEventListener('input', function (event) {
        let inputValue = parseInt(this.innerText.trim()) || 0;
        this.innerText = Math.min(inputValue, 3).toString();
        osszegzes();
        if (this.innerText) {
            let range = document.createRange();
            range.selectNodeContents(this);
            range.collapse(false);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    });

});

gomb.innerHTML = 'Csökkentés 35%';
gomb.onclick = function() {
    csokkentes = 0.35;
    osszegzes();
};
document.body.appendChild(gomb);






function kijelol(elem) {
    if (elem.tagName === 'INPUT') {
        elem.parentNode.classList.toggle('kijelolt');
    } else {
        elem.classList.toggle('kijelolt');
    }
    osszegzes(); // Azonnal hívjuk az osszegzes() függvényt a kijelölés után
}



function masolas() {
    // Kijelölt elem kiválasztása
    var kijeloltElem = document.getElementById('elsoCellakErteke');

    // Ha az elem létezik
    if (kijeloltElem) {
        // Töröljük a gyerekelemeket a tartalmazott szöveg megőrzése érdekében
        var gyerekek = kijeloltElem.children;
        for (var i = 0; i < gyerekek.length; i++) {
            kijeloltElem.removeChild(gyerekek[i]);
        }

        // A tartalom másolása a vágólapra
        var range = document.createRange();
        range.selectNode(kijeloltElem);
        window.getSelection().removeAllRanges(); // Előzőleg kijelölt tartalom törlése
        window.getSelection().addRange(range); // Új tartalom kijelölése
        document.execCommand('copy'); // Másolás végrehajtása

        // Visszaállítjuk a gyerekelemeket az eredeti tartalomhoz
        for (var i = 0; i < gyerekek.length; i++) {
            kijeloltElem.appendChild(gyerekek[i]);
        }

        // Visszajelzés a gomb szövegének cseréjével
        var gomb = document.querySelector('.masolasGomb');
        var eredetiSzoveg = gomb.textContent; // Elmentjük az eredeti gomb szövegét
        gomb.textContent = 'Másolva';

        // Időzített visszaállítás az eredeti szövegre
        setTimeout(function () {
            gomb.textContent = eredetiSzoveg; // Visszaállítjuk az eredeti gomb szövegét
        }, 2000);
    } else {
        // Ha az elem nem található
        alert('A kijelölt elem nem található.');
    }

}
function toggleTableRow(className) {
    var rows = document.getElementsByClassName(className);
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row.style.display === "none") {
            row.style.display = ""; // Kinyitás
        } else {
            row.style.display = "none"; // Lecsukás
        }
    }
}

function collapseAll() {
    var toggleableRows = document.querySelectorAll('.toggleable');
    toggleableRows.forEach(function(row) {
        row.style.display = 'none';
    });
}