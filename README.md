# domain_stripper

Chrome plugin which strips the AWS internal domain names to IP address. We can resolve internal AWS address as we can't reach AWS's internal DNS server. So we just strip the unwanted parts of the domain name to get the IP and by pass DNS resolution step.

Eg: ip-172-31-133-59.eu-central-1.compute.internal adrdress will be converted to "172.31.133.59" even before the DNS request is sent.
