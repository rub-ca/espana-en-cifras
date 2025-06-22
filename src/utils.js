export function getYear(y) {
    return 2024 - y;
}

export function getYearInverse(y) {
    return Math.abs(y - 2024);
}

export const ageGroups90 = ['total', '00-04', '05-09', '10-14', '15-19', '20-24', '25-29',
    '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74',
    '75-79', '80-84', '85-89', '++ 90'];


export function getAgeGroup(g) {
    if (g == 0) return 'total';
    if (g == 1) return '00-04';
    if (g == 2) return '05-09';
    if (g == 3) return '10-14';
    if (g == 4) return '15-19';
    if (g == 5) return '20-24';
    if (g == 6) return '25-29';
    if (g == 7) return '30-34';
    if (g == 8) return '35-39';
    if (g == 9) return '40-44';
    if (g == 10) return '45-49';
    if (g == 11) return '50-54';
    if (g == 12) return '55-59';
    if (g == 13) return '60-64';
    if (g == 14) return '65-69';
    if (g == 15) return '70-74';
    if (g == 16) return '75-79';
    if (g == 17) return '80-84';
    if (g == 18) return '85-89';
    if (g == 19) return '++ 90';
}

export function getAgeGroupInverse(ageGroup) {
    switch (ageGroup) {
        case 'total': return 0;
        case '00-04': return 1;
        case '05-09': return 2;
        case '10-14': return 3;
        case '15-19': return 4;
        case '20-24': return 5;
        case '25-29': return 6;
        case '30-34': return 7;
        case '35-39': return 8;
        case '40-44': return 9;
        case '45-49': return 10;
        case '50-54': return 11;
        case '55-59': return 12;
        case '60-64': return 13;
        case '65-69': return 14;
        case '70-74': return 15;
        case '75-79': return 16;
        case '80-84': return 17;
        case '85-89': return 18;
        case '++ 90': return 19;
        default: return null;
    }
}

export const genreList = ['Total', 'Hombres', 'Mujeres'];

export function getGenre(g) {
    switch (g) {
        case 1:
            return 'Hombres';
        case 2:
            return 'Mujeres';
        case 0:
            return 'Total';
    }
}

export function getGenreInverse(genre) {
    switch (genre) {
        case 'Hombres':
            return 1;
        case 'Mujeres':
            return 2;
        case 'Total':
            return 0;
    }
}