import React from 'react'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './styles.css';
import dayjs from 'dayjs';

function EmployeeForm({ onFinish, initialValues }) {


  return (

    <Form className='p-3' layout='vertical' onFinish={ onFinish } initialValues={{
        ...initialValues,
        ...(initialValues && {
            timings : [
                dayjs(initialValues.timings[0], 'HH'),
                dayjs(initialValues.timings[1], 'HH'),
              ],
        })
    }}>
       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Nombre' name='name' rules={[{ required:true }]}>
                <Input  placeholder='Nombre'/>
            </FormItem>
        </Col>
       </Row>
       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Email' name='email' rules={[{ required: true }]}>
                <Input  placeholder='Email'/>
            </FormItem>
        </Col>
       </Row>
       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Especializacion' name='specialization' rules={[{ required: true }]}>
                <Input  placeholder='Especialización'/>
            </FormItem>
        </Col>
       </Row>
       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Horarios de atención.' name='timings' rules={[{ required: true }]}>
                <TimePicker.RangePicker
                    placeholder='Hora'
                    className='p-3 mt-3' 
                    format='HH'
                />
            </Form.Item>
        </Col>
       </Row>
       <div className='d-flex justify-content-end'>
            <Button 
                className='primary-button mt-3' 
                htmlType='submit'>
                    ENVIAR
            </Button>
       </div>
    </Form>
  )
}

export default EmployeeForm;