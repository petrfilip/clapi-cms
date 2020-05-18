# CLAPI CMS

PHP based Headless CMS with focus on simplicity. Preact is used for content administration.

The backend system is based on [Slim framework](http://www.slimframework.com/) and [SleekDB](https://sleekdb.github.io/). For image manipulation [Glide](http://glide.thephpleague.com/) is used 

Requirements:
- PHP >= 7.2
- GD
- mbstring

System responsive images:
http://example.com/api/public/media/show/14/{profile}
- system-icon
- system-small
- system-medium
- system-large
- system-xlarge

Local development:
- php - running on http://localhost:8888/
```
/usr/bin/php -S localhost:8888 -t ./clapi-cms/api/public ./clapi-cms/api/public/index.php
```

- preact admin - running on http://localhost:8080/
```
npm run dev
```

Extras:
- server timing is supported
- easy responsive image configuration
- secure via JWT
- basic configurations included
- file-based
- strong caching system (database and images)

TODO:
- improved sleekDB for better queries

 
//todo 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Petr Filip** - *Initial work* 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
