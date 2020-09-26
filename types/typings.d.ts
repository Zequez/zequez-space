declare module '*.svg' {
  import React = require('react')
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.css' {
  export default any
}
