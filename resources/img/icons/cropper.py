import cv2
import numpy as np
ref = [{'Grade 8': ['Adelfa', 'Camia', 'Champaca', 'Dahlia', 'Ilang-ilang', 'Jasmin', 'Rosal', 'Sampaguita']}, {'Grade 9': ['Beryllium', 'Cesium', 'Lithium', 'Magnesium', 'Potassium', 'Rubidium', 'Sodium', 'Strontium']}, {'Grade 10': ['Charm', 'Electron', 'Gluon', 'Graviton', 'Muon', 'Photon', 'Tau', 'Truth']}]
refpoints = [(518, 900), (392,1068), (876, 994)]
ref = [ref[1]]
for i in ref:
    g, s = list(i.items())[0]       
    y, x = refpoints[int(g.split()[1])-8]
    for fn in s:
        fn1 = fn if g!="Grade 10" else fn.lower()
        try:
            print(f"{g}/{fn1}.png")
            open(f"{g}/{fn1}.png")
            img = cv2.imread(f"{g}/{fn1}.png", cv2.IMREAD_UNCHANGED)
        except:
            print(f"{g}/{fn1}.png Not found!")
        print(img)
        cv2.imwrite(f"{g}/{fn}.png", img[x:x+100, y:y+100])
