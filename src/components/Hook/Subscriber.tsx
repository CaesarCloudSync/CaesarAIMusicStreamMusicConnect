import React, { useContext } from 'react'
import { Card, Form, Input, Row, Col, Button, Select } from 'antd'
import { QosOption } from './index'

const Subscriber = ({ sub, unSub, showUnsub }:any) => {
  const [form] = Form.useForm()
  const qosOptions = useContext(QosOption)

  // topic & QoS for MQTT subscribing
  const record = {
    topic: 'testtopic/react',
    qos: 0,
  }

  const onFinish = (values:any) => {
    sub(values)
  }

  const handleUnsub = () => {
    const values = form.getFieldsValue()
    unSub(values)
  }

  const SubForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Topic" name="topic">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="QoS" name="qos">
            <Select options={qosOptions} />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Subscribe
            </Button>
            {showUnsub ? (
              <Button

                style={{ marginLeft: '10px',backgroundColor:"red" }}
                onClick={handleUnsub}
              >
                Unsubscribe
              </Button>
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return <Card title="Subscriber">{SubForm}</Card>
}

export default Subscriber
