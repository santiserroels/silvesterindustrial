import 'react'
import { Form, FormikProvider, useFormik } from 'formik'
import { Button, TextInputField } from '../../components'
import * as yup from 'yup'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'

interface CheckoutFormValues {
    first_name: string
    last_name: string
    id: string
    address: string
    phone: string
}

type CheckoutProps = {
    cart: Cart[]
    total: string
}

const CheckoutValidationSchema: yup.Schema<CheckoutFormValues> = yup.object({
    first_name: yup.string().required('Campo requerido'),
    last_name: yup.string().required('Campo requerido'),
    id: yup.string().required('Campo requerido'),
    address: yup.string().required('Campo requerido'),
    phone: yup.string().required('Campo requerido'),
})

const Checkout = ({ cart, total }: CheckoutProps) => {
    const navigate = useNavigate()
    const purchaseItems = useMemo(() => cart.map(({ name, quantity }) => `${name} x${quantity}`), [cart])

    const formik = useFormik<CheckoutFormValues>({
        onSubmit: (values) => {
            const message = `Pedido:\n${purchaseItems.join('\n')}\n\nTotal: ${total}\n\nCliente:\n${
                values.first_name
            } ${values.last_name}\nDNI: ${values.id}\nDomicilio: ${values.address}\nTelefono: ${values.phone}`
            window.open(
                `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
                '_blank'
            )
        },
        initialValues: {
            first_name: '',
            last_name: '',
            id: '',
            address: '',
            phone: '',
        },
        validationSchema: CheckoutValidationSchema,
    })

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/')
        }
    }, [cart, navigate])

    return (
        <div>
            <h2 className="mb-2">Finalizar Pedido</h2>
            <FormikProvider value={formik}>
                <Form className="max-w-[900px]">
                    <TextInputField name="first_name" label="Nombre" />
                    <TextInputField name="last_name" label="Apellido" />
                    <TextInputField name="id" label="DNI" />
                    <TextInputField name="address" label="Domicilio" />
                    <TextInputField name="phone" label="Teléfono" />
                    <Button type="submit">Enviar Pedido</Button>
                </Form>
            </FormikProvider>
        </div>
    )
}

export default Checkout
