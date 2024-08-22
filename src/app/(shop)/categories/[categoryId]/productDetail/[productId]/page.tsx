type Props = {
	params: {
		productId: string
	}
}

const ProductPage = ({ params: { productId } }: Props) => {
	return <div>{productId}</div>
}

export default ProductPage
