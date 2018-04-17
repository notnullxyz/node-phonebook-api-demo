Project4Alpha

Hi there guys,
Thanks for the call and chats, emails and patience.

Once you have extracted or cloned the source, you should do:

1. npm install
2. docker-compose up -d web_app

This should bring up a (docker ps) container or two that will be exposed on a port, ready for consumption:

marlonv@ ~/dev/marlon/project4alpha (master) $ docker ps
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
7d7131124d95        project4alpha_web_app   "node node_modules..."   3 hours ago         Up 3 hours          0.0.0.0:8088->8088/tcp, 8080/tcp, 0.0.0.0:9229->9229/tcp   project4alpha_web_app_1
e98ab7ac3460        redis                   "docker-entrypoint..."   3 hours ago         Up 3 hours          0.0.0.0:6379->6379/tcp                                     project4alpha_redis_1

Thereafter, you can view the logs (tailed) with `docker logs -f project4alpha_web_app_1` while consuming the API.

The endpoints are:
┌──────┬───────────────────┬─────────────────┬──────────────────┐
│      │ Name              │ Url             │ Scope            │
├──────┼───────────────────┼─────────────────┼──────────────────┤
│ POST │ create_phonebook  │ /v1/phonebook   │ phonebook/create │
│ GET  │ list_phonebooks   │ /v1/phonebook   │ phonebook/list   │
│ POST │ create_entry      │ /v1/entry       │ entry/create     │
│ GET  │ get_entry_by_name │ /v1/entry/:name │ entry/get        │
│ GET  │ list_entries      │ /v1/entry       │ entry/list       │
└──────┴───────────────────┴─────────────────┴──────────────────┘

The POSTS endpoints take JSON request bodies, as below:

POST create_entry:
{
	"name": "gertjie kruiwa",
	"number": "838383821-1"
}

POST create_phonebook:
{
	"name": "family"
}




