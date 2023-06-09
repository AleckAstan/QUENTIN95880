import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate.js"
import ProductModel from "@/api/db/models/ProductModel.js"
import { idValidator } from "@/validators.js"

const handler = mw({
  GET: [
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }) => {
      try {
        const product = await ProductModel.query()
          .select("*")
          .where("id", productId)

        if (!product) {
          res.send({
            result: false,
          })
        }

        res.send({
          result: product,
        })
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    },
  ],
})

export default handler
