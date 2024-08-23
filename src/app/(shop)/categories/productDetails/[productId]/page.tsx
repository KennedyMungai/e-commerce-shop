type Props = {
	params: {
		productId: string
	}
}

const ProductDetail = ({ params: { productId } }: Props) => {
	return <div>{productId}</div>
}

export default ProductDetail
