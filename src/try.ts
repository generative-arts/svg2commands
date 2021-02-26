import { ParserController } from './controller/parser.controller'
import { SvgReaderController } from './controller/svg.reader.controller'

const fileName = 'DIRECTORY'

async function run() {
  const svg = await SvgReaderController.read(fileName)
  const parsed = ParserController.parse(svg)
  console.log(parsed)
}

run()
