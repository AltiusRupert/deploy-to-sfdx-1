web: node web.js
orgbuilder: DEBUG=* xvfb-run --auto-servernum --server-args="-screen 0 1024x768x24" node lib/deployConsumer.js
poolwatcher: node lib/poolMaintenance.js
pooldeployer: DEBUG=* xvfb-run --auto-servernum --server-args="-screen 0 1024x768x24" node lib/poolConsumer.js
oneoffbuilder: DEBUG=* xvfb-run --auto-servernum --server-args="-screen 0 1024x768x24" node lib/deployOneOff.js
poolskimmer: node lib/skimmer.js
dynoskimmer: node lib/dynoCleanup.js