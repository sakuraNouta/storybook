import _ from 'lodash';

export const DTP_METHODS = {
  PING: 'ping',
  TCP: 'tcp',
  UDP: 'udp',
  HTTP: 'http'
};

export const HTTP_TYPE = {
  GET: 'get',
  POST: 'post'
};

const HTTP_TYPE_OPTIONS = _.keys(HTTP_TYPE).map(k => ({
  value: HTTP_TYPE[k],
  label: HTTP_TYPE[k]
}));

const ipCheck = (rule, value, callback) => {
  const ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (!ipReg.test(value)) {
    callback(new Error('请填写正确的ip'));
  }
  callback();
};

const urlCheck = (rule, value, callback) => {
  const urlReg = /^(((ht|f)tps?):\/\/)[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

  if (!urlReg.test(value)) {
    callback(new Error('请填写正确的url'));
  }
  callback();
};

const pingCountCheck = (rule, value, callback) => {
  const pingCountReg = /^\d+$/;

  if (pingCountReg.test(value)) {
    callback();
  } else {
    callback(new Error('请填写正确的ping次数，需正整数格式'));
  }
};

export const DYNAMIC_PARAM = {
  ping: [
    {
      label: 'IP',
      key: 'ipOrUrl',
      suffix: 'ping的目标IP,例如:111.168.13.255',
      rule: [
        { required: true, message: '请填写ping的目标IP', trigger: 'blur' },
        { validator: ipCheck, trigger: 'blur' }
      ]
    },
    {
      label: 'ping次数',
      key: 'pingCount',
      unit: '次',
      rule: [
        { required: true, message: '请填写ping次数', trigger: 'change' },
        { validator: pingCountCheck, trigger: 'blur' }
      ]
    }
  ],
  tcp: [
    {
      label: 'IP',
      key: 'ipOrUrl',
      suffix: 'tcp的目标IP,例如:111.168.13.255',
      rule: [
        { required: true, message: '请填写tcp的目标IP', trigger: 'blur' },
        { validator: ipCheck, trigger: 'blur' }
      ]
    },
    {
      label: '端口',
      key: 'port',
      suffix: 'tcp的目标端口,例如:22',
      rule: [
        { required: true, message: '请填写tcp的目标端口', trigger: 'change' },
        { validator: pingCountCheck, trigger: 'blur' }
      ]
    }
  ],
  udp: [
    {
      label: 'IP',
      key: 'ipOrUrl',
      suffix: 'udp的目标IP,例如:111.168.13.255',
      rule: [
        { required: true, message: '请填写udp的目标IP', trigger: 'blur' },
        { validator: ipCheck, trigger: 'blur' }
      ]
    },
    {
      label: '端口',
      key: 'port',
      suffix: 'udp的目标端口,例如:22',
      rule: [
        { required: true, message: '请填写udp的目标端口', trigger: 'change' },
        { validator: pingCountCheck, trigger: 'blur' }
      ]
    }
  ],
  http: [
    {
      label: '请求类型',
      key: 'requestMethod',
      type: 'select',
      defaultValue: HTTP_TYPE.GET,
      options: HTTP_TYPE_OPTIONS,
      rule: { required: true }
    },
    {
      label: 'URL',
      key: 'ipOrUrl',
      suffix: 'http的目标URL,例如:http://111.168.13.255:7001',
      rule: [
        { required: true, message: '请填写目标URL', trigger: 'blur' },
        { validator: urlCheck, trigger: 'blur' }
      ]
    },
    {
      label: 'post参数',
      key: 'data',
      show: item => item.requestMethod === HTTP_TYPE.POST
    },
    {
      label: '校验参数',
      key: 'checkForm',
      suffix: h =>
        h(
          'el-popover',
          {
            props: {
              placement: 'top-start',
              width: '200',
              trigger: 'hover',
              openDelay: 300
            }
          },
          [
            h('span', { class: 'task-detail__tip-img' }),
            h(
              'span',
              { class: 'task-detail__tip', slot: 'reference' },
              '匹配填写关键字'
            )
          ]
        ),
      rule: [{ required: true, message: '请填写校验参数', trigger: 'change' }]
    }
  ]
};
