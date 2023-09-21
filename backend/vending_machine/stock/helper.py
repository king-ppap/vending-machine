from typing import Dict


def findMinChange(ca: int, remaining: Dict[str, int]):
    result = {
        "coin_1": 0,
        "coin_5": 0,
        "coin_10": 0,
        "banknote_20": 0,
        "banknote_50": 0,
        "banknote_100": 0,
        "banknote_500": 0,
        "banknote_1000": 0,
    }

    while (ca > 0):
        isCanChange = False
        if (ca >= 1000 and remaining["banknote_1000"] > 0):
            result["banknote_1000"] += 1
            remaining["banknote_1000"] -= 1
            ca -= 1000
            isCanChange = True
        elif (ca >= 500 and remaining["banknote_500"] > 0):
            result["banknote_500"] += 1
            remaining["banknote_500"] -= 1
            ca -= 500
            isCanChange = True
        elif (ca >= 100 and remaining["banknote_100"] > 0):
            result["banknote_100"] += 1
            remaining["banknote_100"] -= 1
            ca -= 100
            isCanChange = True
        elif (ca >= 50 and remaining["banknote_50"] > 0):
            result["banknote_50"] += 1
            remaining["banknote_50"] -= 1
            ca -= 50
            isCanChange = True
        elif (ca >= 20 and remaining["banknote_20"] > 0):
            result["banknote_20"] += 1
            remaining["banknote_20"] -= 1
            ca -= 20
            isCanChange = True
        elif (ca >= 10 and remaining["coin_10"] > 0):
            result["coin_10"] += 1
            remaining["coin_10"] -= 1
            ca -= 10
            isCanChange = True
        elif (ca >= 5 and remaining["coin_5"] > 0):
            result["coin_5"] += 1
            remaining["coin_5"] -= 1
            ca -= 5
            isCanChange = True
        elif (ca >= 1 and remaining["coin_1"] > 0):
            result["coin_1"] += 1
            remaining["coin_1"] -= 1
            ca -= 1
            isCanChange = True

        if not isCanChange:
            return -1

    return result
