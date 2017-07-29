import crypto from 'crypto';

const concatParams = (params) => {
  return params.map(({key, value})=>key + '=' + value).join('&');
};

const genSig = (params, consumerSecret)=> {
  let str = concatParams(params) + consumerSecret;
  return crypto.createHash('sha1').update(new Buffer(str).toString('hex')).digest('hex');
};

const buildUrl = (oid, prefix, consumerSecret) => {
  const params = [
    {key: 'oid', value: oid},
    {key: 'ts', value: (new Date()).getTime().toString()}
  ];
  const query = concatParams(params.concat({
    key: 'sig',
    value: genSig(params, consumerSecret),
  }));
  return `${prefix}${query}&bizOrderId=12313`;
}

export default buildUrl;