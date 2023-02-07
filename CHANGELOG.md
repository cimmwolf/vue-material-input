# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- The component now always has class .filled then type is datetime-local
- The hint is no longer displayed while there is an input error
- Fix updating valueInternal for v-model binding

## [2.2.0]
### Fixed
- Fix updating valueInternal in InputSelectMaterial
- Fix initiation of valueInternal in InputSelectMaterial
### Changed
- Remove hardcoded color of label

## [2.1.1]
### Fixed
- Fix error with model binding

## [2.1.0]
### Added
- Add InputSelectMaterial component

## [2.0.0]
### Changed
- Change emitted event for supporting v-model in Vue 3

## [1.2.1]
### Changed
- Change :autofill pseudo selector to -webkit-autofill.

## [1.2.0] - 2022-10-09
### Removed
- CSS variable --autofill-color in .material-input style attribute.

## [1.1.3] - 2022-10-09
### Fixed
- Fix label position for input:autofil.

## [1.1.2] - 2022-09-12
### Added
- Custom events emmit for native input's blur and focus.

## [1.1.1] - 2022-06-09
### Added
- Autocomplete attribute.

## [1.0.2] - 2022-05-16
### Added
- This document.
- Default value for --font-color variable.
### Removed
- Node-sass and sass-loader dev dependencies.
