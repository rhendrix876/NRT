// Basic Proxy Auto-Config for kObserver testing
function FindProxyForURL(url, host) {
    // basic hostnames and private IP addresses should bypass the proxies
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0",  "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0",  "255.255.0.0")) {
      // go direct to the origin
      return "DIRECT";
    }
    // Send a variety of top-level domains to the kobserver; on failure fallback to direct to the origin
    if (shExpMatch(host, "salesforce.com") || shExpMatch(host, "*.salesforce.com") ||
        shExpMatch(host, "microsoft.com") || shExpMatch(host, "*.microsoft.com") ||
        shExpMatch(host, "cnn.com") || shExpMatch(host, "*cnn.com") ||
		shExpMatch(host, "kobserver.kollective.app") || shExpMatch(host, "*kobserver.kollective.app") ||
		shExpMatch(host, "office.com") || shExpMatch(host, "*.office.com")) {
            // first to kobserver, with fallback
            return "PROXY kobserver.kollective.app:31020; DIRECT";
      // if also using enterprise proxies, then you probably want something like
      //
      // return "PROXY kobserver.kollective.app:31020; PROXY 10.107.20.43:3128; PROXY 172.16.120.107:8118";
      //
      // NOTE: the returned value can be a semi-colon delimited list. Normally, clients
      // should systematically try each, in order, until one succeeds. However, the
      // kobserver doesn't currently support this type of fallback-to-multiple proxies
      // logic. In the above example, the kobserver will receive the initial request
      // for *.salesforce.com, will remove itself from the PAC file response and attempt
      // to send the "origin" request off to the proxy at 10.107.20.43:3128. If **that**
      // proxy fails (it is down), the correct behavior would be to try the next one ...
      //  but the kobserver doesn't currently detect enterprise proxy failure and retry
      // the next in the list.
    }
    // anything else should go direct to the origin
    return "DIRECT";
}
