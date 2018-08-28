web: node web.js
orgbuilder: DEBUG=* xvfb-run --server-args="-screen 0 1280x1028x24 -ac +extension GLX +render" node lib/deployConsumer.js
poolwatcher: node lib/poolMaintenance.js
pooldeployer: DEBUG=* xvfb-run --server-args="-screen 0 1280x1028x24 -ac +extension GLX +render" node lib/poolConsumer.js
oneoffbuilder: DEBUG=* xvfb-run --server-args="-screen 0 1280x1028x24 -ac +extension GLX +render" node lib/deployOneOff.js
poolskimmer: node lib/skimmer.js
dynoskimmer: node lib/dynoCleanup.js