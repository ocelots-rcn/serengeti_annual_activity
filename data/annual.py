import json
data = {'species': {}, 'years': []}

f = open('Serengeti-data-20220713.csv', 'r')
header = f.readline()[:-1].replace('.', ' ').split(',')



while True:
    line = f.readline()
    if not line:
        break
    # remove new line
    line = line[:-1]
    parts = line.split(',')
    key = parts[header.index('Species')]
    year = parts[header.index('Year')]

    if key not in data['species']:
        data['species'][key] = {}
    if year not in data['species'][key]:
        data['species'][key][year] = {}
        data['species'][key][year]['month'] = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0}
        data['species'][key][year]['total'] = 0
    if year not in data['years']:
        data['years'].append(year)

    month = parts[header.index('Month  1 Jan  ')]
    data['species'][key][year]['month'][month] += 1
    data['species'][key][year]['total'] += 1

data['years'].sort()

f.close()
f = open('annual.json', 'w')
json.dump(data, f)
f.close()
