import express from "express"
import { getNotas, getNota, postNota, updateNota, deleteNota } from "../controllers/notas.js"

const router = express.Router()

router.get("/", getNotas)

router.get("/:search", getNota)

router.post("/", postNota)

router.put("/:id", updateNota)

router.delete("/:id", deleteNota)

export default router