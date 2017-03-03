export function host(url) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') parts.shift()
    return parts.join('.')
}

import moment from 'moment';
exports.moment = (value, formatString) => {
    //console.log(value)
    formatString = formatString || 'YYYY-MM-DD HH:MM:ss';
    if (!!!value) {
        return ''
    }
    return moment(value).format(formatString);
}

exports.getMonth = (value) => {
    if (!!!value) {
        return ''
    }
    return new Date(value).getMonth() + 1;
} 

exports.getDay = (value) => {
    if (!!!value) {
        return ''
    }
    return new Date(value).getDate();
}

exports.getHoursSS = (value) => {
    if (!!!value) {
        return ''
    }
    return  moment(value).format('HH:MM');
}
