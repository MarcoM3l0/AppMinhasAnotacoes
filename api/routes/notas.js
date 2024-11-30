import express from "express"
import { getNotas, postNota, updateNota, deleteNota } from "../controllers/notas.js"

const router = express.Router()

router.get("/", getNotas)

router.post("/", postNota)

router.put("/:id", updateNota)

router.delete("/:id", deleteNota)

export default router