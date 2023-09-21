def find_min_change(ca: int, remaining: dict):
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
        if (ca >= 1000 and remaining["banknote_1000"] > 0):
            result["banknote_1000"] += 1
            remaining["banknote_1000"] -= 1
            ca -= 1000
        elif (ca >= 500 and remaining["banknote_500"] > 0):
            result["banknote_500"] += 1
            remaining["banknote_500"] -= 1
            ca -= 500
        elif (ca >= 100 and remaining["banknote_100"] > 0):
            result["banknote_100"] += 1
            remaining["banknote_100"] -= 1
            ca -= 100
        elif (ca >= 50 and remaining["banknote_50"] > 0):
            result["banknote_50"] += 1
            remaining["banknote_50"] -= 1
            ca -= 50
        elif (ca >= 20 and remaining["banknote_20"] > 0):
            result["banknote_20"] += 1
            remaining["banknote_20"] -= 1
            ca -= 20
        elif (ca >= 10 and remaining["coin_10"] > 0):
            result["coin_10"] += 1
            remaining["coin_10"] -= 1
            ca -= 10
        elif (ca >= 5 and remaining["coin_5"] > 0):
            result["coin_5"] += 1
            remaining["coin_5"] -= 1
            ca -= 5
        elif (ca >= 1 and remaining["coin_1"] > 0):
            result["coin_1"] += 1
            remaining["coin_1"] -= 1
            ca -= 1
        else:
            return -1

    return result


def find_min_without_limit(ca: int):
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
        if (ca >= 1000):
            result["banknote_1000"] += 1
            ca -= 1000
        elif (ca >= 500):
            result["banknote_500"] += 1
            ca -= 500
        elif (ca >= 100):
            result["banknote_100"] += 1
            ca -= 100
        elif (ca >= 50):
            result["banknote_50"] += 1
            ca -= 50
        elif (ca >= 20):
            result["banknote_20"] += 1
            ca -= 20
        elif (ca >= 10):
            result["coin_10"] += 1
            ca -= 10
        elif (ca >= 5):
            result["coin_5"] += 1
            ca -= 5
        elif (ca >= 1):
            result["coin_1"] += 1
            ca -= 1

    return result


def adjust_money(machine, refund):
    return {
        "uuid": machine.uuid,
        "coin_1": machine.coin_1 - refund["coin_1"],
        "coin_5": machine.coin_5 - refund["coin_5"],
        "coin_10": machine.coin_10 - refund["coin_10"],
        "banknote_20": machine.banknote_20 - refund["banknote_20"],
        "banknote_50": machine.banknote_50 - refund["banknote_50"],
        "banknote_100": machine.banknote_100 - refund["banknote_100"],
        "banknote_500": machine.banknote_500 - refund["banknote_500"],
        "banknote_1000": machine.banknote_1000 - refund["banknote_1000"],
    }
