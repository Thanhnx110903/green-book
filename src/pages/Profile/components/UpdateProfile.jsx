import { Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useUpdateProfileMutation } from '../../../redux/api/user'

export default function UpdateProfile({ data }) {
  const [updateProfile] = useUpdateProfileMutation()
  const [form] = Form.useForm()
  const onFinish = (values) => {
    delete values.email
    updateProfile(values)
      .unwrap()
      .then((item) => {
        message.success(item?.message)
      })
      .catch((error) => {
        message.error('Lỗi không cập nhật được')
        console.log(error)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
  const validatePhoneNumber = (_, value) => {
    if (value) {
      if (!phonePattern.test(value)) {
        return Promise.reject('Số điện thoại không hợp lệ!')
      }
    }
    return Promise.resolve()
  }
  useEffect(() => {
    if (Object.keys(data).length) {
      const defaultValue = {
        email: data.email,
        name: data.name,
        phone_number: data.phone_number
      }
      form.setFieldsValue(defaultValue)
    }
  }, [data])
  return (
    <Form
      name='updateProfile'
      layout='vertical'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      form={form}
    >
      <Form.Item
        label='Họ tên'
        name='name'
        rules={[
          { required: true, message: 'Không bỏ trống' },
          { min: 5, message: 'Tên tối thiểu 5 kí tự' }
        ]}
      >
        <Input className='min-h-[40px] rounded-lg text-[16px]' placeholder='Họ và tên' />
      </Form.Item>

      <Form.Item label='Email' name='email'>
        <Input className='min-h-[40px] rounded-lg text-[16px]' readOnly placeholder='something@gmail.com' />
      </Form.Item>

      <Form.Item
        label='Điện thoại'
        name='phone_number'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập số điện thoại!'
          },
          {
            validator: validatePhoneNumber
          }
        ]}
      >
        <Input className='min-h-[40px] rounded-lg text-[16px]' placeholder='+842938493043' />
      </Form.Item>

      <Form.Item>
        <button type='submit' className='bg-[#357ebd] hover:opacity-[0.8] text-white py-3 px-8 rounded-[6px]'>
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  )
}
