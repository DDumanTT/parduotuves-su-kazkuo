import collections
import numpy as np
import skfuzzy as fuzz
import sys


def f_start(x, c, d):
    if x < c:
        return 1
    elif x >= c and x < d:
        return ((d - x) / (d - c))
    else:
        return 0


def f_end(x, a, b):
    if x < a:
        return 0
    elif x >= a and x < b:
        return ((x - a) / (b - a))
    else:
        return 1


def f_triangle(x, a, b, c):
    if x < a:
        return 0
    elif x >= a and x < b:
        return ((x - a) / (b - a))
    elif x >= b and x < c:
        return ((c - x) / (c - b))
    else:
        return 0


def f_trapezoid(x, a, b, c, d):
    if x < a:
        return 0
    elif x >= a and x < b:
        return ((x - a) / (b - a))
    elif x >= b and x < c:
        return 1
    elif x >= c and x < d:
        return ((d - x) / (d - c))
    else:
        return 0


def f_dist(x, k):
    return {0: f_start(x, 0, 15),
            1: f_trapezoid(x, 10, 20, 40, 50),
            2: f_end(x, 40, 60)}[k]


def f_busy(x, k):
    return {0: f_start(x, 5, 10),
            1: f_triangle(x, 6, 10, 15),
            2: f_triangle(x, 12, 18, 25),
            3: f_end(x, 20, 25)}[k]


def f_rating(x, k):
    return {0: f_start(x, 1.5, 2.5),
            1: f_triangle(x, 2, 2.8, 3.5),
            2: f_triangle(x, 3, 3.7, 4.5),
            3: f_end(x, 4, 5)}[k]


def f_suitable(x, k):
    return {0: f_start(x, 2, 5),
            1: f_triangle(x, 4, 6, 8),
            2: f_end(x, 7, 10)}[k]


def bad_suitability(d, b, r):
    r1 = max(f_dist(d, 2), f_busy(b, 3))
    r2 = max(f_dist(d, 2), f_rating(r, 0))
    return sum([r1, r2])


def avg_suitability(d, b, r):
    r3 = min(f_dist(d, 1), f_busy(b, 1))
    r4 = min(f_dist(d, 1), f_rating(r, 1))
    r5 = min(f_dist(d, 2), f_rating(r, 2))
    r6 = min(f_dist(d, 0), f_busy(b, 2))
    r7 = min(f_dist(d, 1), f_busy(b, 3), f_rating(r, 1))
    return sum([r3, r4, r5, r6, r7])


def good_suitability(d, b, r):
    r8 = min(f_rating(r, 3), f_busy(b, 0))
    r9 = min(f_dist(d, 0), f_busy(b, 0))
    r10 = min(f_dist(d, 0), f_rating(r, 3))
    r11 = min(f_busy(b, 3), f_rating(r, 3), f_dist(d, 0))
    r12 = min(f_busy(b, 0), f_rating(r, 0), f_dist(d, 0))
    r13 = min(f_busy(b, 0), f_rating(r, 3), f_dist(d, 2))
    return sum([r8, r9, r10, r11, r12, r13])


distance = int(sys.argv[1])
busyness = int(sys.argv[2])
rating = int(sys.argv[3])

bad = bad_suitability(distance, busyness, rating)
avg = avg_suitability(distance, busyness, rating)
good = good_suitability(distance, busyness, rating)

x = np.arange(0, 10, 0.1)

mf_bad = fuzz.trimf(x, [0, 2, 5])
mf_avg = fuzz.trimf(x, [4, 6, 8])
mf_good = fuzz.trimf(x, [7, 10, 10])

mf = np.fmax(mf_bad * bad, np.fmax(mf_avg * avg, mf_good * good))

x = np.arange(0, 10, 0.1)
suitability_centroid = fuzz.defuzz(x, mf, 'centroid')
suitability_mom = fuzz.defuzz(x, mf, 'mom')
print(suitability_centroid)

x = np.arange(0, 10, 0.1)
left = fuzz.trapmf(x, [0, 0, 5, 6])
right = fuzz.trimf(x, [5, 10, 10])
mx = np.fmax(left * 0.7, right * 0.5)
c = collections.Counter(mx >= max(mx))
method = 'centroid' if c[True] > c[False] else 'MOM'
# print(fuzz.defuzz(x, mx, method))
