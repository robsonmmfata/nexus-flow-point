// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

AppUser _$AppUserFromJson(Map<String, dynamic> json) {
  return _AppUser.fromJson(json);
}

/// @nodoc
mixin _$AppUser {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get email => throw _privateConstructorUsedError;
  UserRole get role => throw _privateConstructorUsedError;
  String? get phone => throw _privateConstructorUsedError;
  double? get rating => throw _privateConstructorUsedError;

  /// Serializes this AppUser to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AppUser
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AppUserCopyWith<AppUser> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AppUserCopyWith<$Res> {
  factory $AppUserCopyWith(AppUser value, $Res Function(AppUser) then) =
      _$AppUserCopyWithImpl<$Res, AppUser>;
  @useResult
  $Res call({
    String id,
    String name,
    String email,
    UserRole role,
    String? phone,
    double? rating,
  });
}

/// @nodoc
class _$AppUserCopyWithImpl<$Res, $Val extends AppUser>
    implements $AppUserCopyWith<$Res> {
  _$AppUserCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AppUser
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
    Object? role = null,
    Object? phone = freezed,
    Object? rating = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            email: null == email
                ? _value.email
                : email // ignore: cast_nullable_to_non_nullable
                      as String,
            role: null == role
                ? _value.role
                : role // ignore: cast_nullable_to_non_nullable
                      as UserRole,
            phone: freezed == phone
                ? _value.phone
                : phone // ignore: cast_nullable_to_non_nullable
                      as String?,
            rating: freezed == rating
                ? _value.rating
                : rating // ignore: cast_nullable_to_non_nullable
                      as double?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AppUserImplCopyWith<$Res> implements $AppUserCopyWith<$Res> {
  factory _$$AppUserImplCopyWith(
    _$AppUserImpl value,
    $Res Function(_$AppUserImpl) then,
  ) = __$$AppUserImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String name,
    String email,
    UserRole role,
    String? phone,
    double? rating,
  });
}

/// @nodoc
class __$$AppUserImplCopyWithImpl<$Res>
    extends _$AppUserCopyWithImpl<$Res, _$AppUserImpl>
    implements _$$AppUserImplCopyWith<$Res> {
  __$$AppUserImplCopyWithImpl(
    _$AppUserImpl _value,
    $Res Function(_$AppUserImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of AppUser
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
    Object? role = null,
    Object? phone = freezed,
    Object? rating = freezed,
  }) {
    return _then(
      _$AppUserImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        email: null == email
            ? _value.email
            : email // ignore: cast_nullable_to_non_nullable
                  as String,
        role: null == role
            ? _value.role
            : role // ignore: cast_nullable_to_non_nullable
                  as UserRole,
        phone: freezed == phone
            ? _value.phone
            : phone // ignore: cast_nullable_to_non_nullable
                  as String?,
        rating: freezed == rating
            ? _value.rating
            : rating // ignore: cast_nullable_to_non_nullable
                  as double?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AppUserImpl implements _AppUser {
  const _$AppUserImpl({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.phone,
    this.rating,
  });

  factory _$AppUserImpl.fromJson(Map<String, dynamic> json) =>
      _$$AppUserImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String email;
  @override
  final UserRole role;
  @override
  final String? phone;
  @override
  final double? rating;

  @override
  String toString() {
    return 'AppUser(id: $id, name: $name, email: $email, role: $role, phone: $phone, rating: $rating)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AppUserImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.role, role) || other.role == role) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.rating, rating) || other.rating == rating));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, id, name, email, role, phone, rating);

  /// Create a copy of AppUser
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AppUserImplCopyWith<_$AppUserImpl> get copyWith =>
      __$$AppUserImplCopyWithImpl<_$AppUserImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AppUserImplToJson(this);
  }
}

abstract class _AppUser implements AppUser {
  const factory _AppUser({
    required final String id,
    required final String name,
    required final String email,
    required final UserRole role,
    final String? phone,
    final double? rating,
  }) = _$AppUserImpl;

  factory _AppUser.fromJson(Map<String, dynamic> json) = _$AppUserImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get email;
  @override
  UserRole get role;
  @override
  String? get phone;
  @override
  double? get rating;

  /// Create a copy of AppUser
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AppUserImplCopyWith<_$AppUserImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Vehicle _$VehicleFromJson(Map<String, dynamic> json) {
  return _Vehicle.fromJson(json);
}

/// @nodoc
mixin _$Vehicle {
  String get id => throw _privateConstructorUsedError;
  String get ownerId => throw _privateConstructorUsedError;
  String get plate => throw _privateConstructorUsedError;
  String get model => throw _privateConstructorUsedError;
  String get make => throw _privateConstructorUsedError;
  int? get year => throw _privateConstructorUsedError;

  /// Serializes this Vehicle to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Vehicle
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $VehicleCopyWith<Vehicle> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VehicleCopyWith<$Res> {
  factory $VehicleCopyWith(Vehicle value, $Res Function(Vehicle) then) =
      _$VehicleCopyWithImpl<$Res, Vehicle>;
  @useResult
  $Res call({
    String id,
    String ownerId,
    String plate,
    String model,
    String make,
    int? year,
  });
}

/// @nodoc
class _$VehicleCopyWithImpl<$Res, $Val extends Vehicle>
    implements $VehicleCopyWith<$Res> {
  _$VehicleCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Vehicle
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? ownerId = null,
    Object? plate = null,
    Object? model = null,
    Object? make = null,
    Object? year = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            ownerId: null == ownerId
                ? _value.ownerId
                : ownerId // ignore: cast_nullable_to_non_nullable
                      as String,
            plate: null == plate
                ? _value.plate
                : plate // ignore: cast_nullable_to_non_nullable
                      as String,
            model: null == model
                ? _value.model
                : model // ignore: cast_nullable_to_non_nullable
                      as String,
            make: null == make
                ? _value.make
                : make // ignore: cast_nullable_to_non_nullable
                      as String,
            year: freezed == year
                ? _value.year
                : year // ignore: cast_nullable_to_non_nullable
                      as int?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$VehicleImplCopyWith<$Res> implements $VehicleCopyWith<$Res> {
  factory _$$VehicleImplCopyWith(
    _$VehicleImpl value,
    $Res Function(_$VehicleImpl) then,
  ) = __$$VehicleImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String ownerId,
    String plate,
    String model,
    String make,
    int? year,
  });
}

/// @nodoc
class __$$VehicleImplCopyWithImpl<$Res>
    extends _$VehicleCopyWithImpl<$Res, _$VehicleImpl>
    implements _$$VehicleImplCopyWith<$Res> {
  __$$VehicleImplCopyWithImpl(
    _$VehicleImpl _value,
    $Res Function(_$VehicleImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Vehicle
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? ownerId = null,
    Object? plate = null,
    Object? model = null,
    Object? make = null,
    Object? year = freezed,
  }) {
    return _then(
      _$VehicleImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        ownerId: null == ownerId
            ? _value.ownerId
            : ownerId // ignore: cast_nullable_to_non_nullable
                  as String,
        plate: null == plate
            ? _value.plate
            : plate // ignore: cast_nullable_to_non_nullable
                  as String,
        model: null == model
            ? _value.model
            : model // ignore: cast_nullable_to_non_nullable
                  as String,
        make: null == make
            ? _value.make
            : make // ignore: cast_nullable_to_non_nullable
                  as String,
        year: freezed == year
            ? _value.year
            : year // ignore: cast_nullable_to_non_nullable
                  as int?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$VehicleImpl implements _Vehicle {
  const _$VehicleImpl({
    required this.id,
    required this.ownerId,
    required this.plate,
    required this.model,
    required this.make,
    this.year,
  });

  factory _$VehicleImpl.fromJson(Map<String, dynamic> json) =>
      _$$VehicleImplFromJson(json);

  @override
  final String id;
  @override
  final String ownerId;
  @override
  final String plate;
  @override
  final String model;
  @override
  final String make;
  @override
  final int? year;

  @override
  String toString() {
    return 'Vehicle(id: $id, ownerId: $ownerId, plate: $plate, model: $model, make: $make, year: $year)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VehicleImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.ownerId, ownerId) || other.ownerId == ownerId) &&
            (identical(other.plate, plate) || other.plate == plate) &&
            (identical(other.model, model) || other.model == model) &&
            (identical(other.make, make) || other.make == make) &&
            (identical(other.year, year) || other.year == year));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, id, ownerId, plate, model, make, year);

  /// Create a copy of Vehicle
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$VehicleImplCopyWith<_$VehicleImpl> get copyWith =>
      __$$VehicleImplCopyWithImpl<_$VehicleImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$VehicleImplToJson(this);
  }
}

abstract class _Vehicle implements Vehicle {
  const factory _Vehicle({
    required final String id,
    required final String ownerId,
    required final String plate,
    required final String model,
    required final String make,
    final int? year,
  }) = _$VehicleImpl;

  factory _Vehicle.fromJson(Map<String, dynamic> json) = _$VehicleImpl.fromJson;

  @override
  String get id;
  @override
  String get ownerId;
  @override
  String get plate;
  @override
  String get model;
  @override
  String get make;
  @override
  int? get year;

  /// Create a copy of Vehicle
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$VehicleImplCopyWith<_$VehicleImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ServiceDefinition _$ServiceDefinitionFromJson(Map<String, dynamic> json) {
  return _ServiceDefinition.fromJson(json);
}

/// @nodoc
mixin _$ServiceDefinition {
  String get id => throw _privateConstructorUsedError;
  ServiceType get type => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get description => throw _privateConstructorUsedError;

  /// Serializes this ServiceDefinition to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ServiceDefinition
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ServiceDefinitionCopyWith<ServiceDefinition> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ServiceDefinitionCopyWith<$Res> {
  factory $ServiceDefinitionCopyWith(
    ServiceDefinition value,
    $Res Function(ServiceDefinition) then,
  ) = _$ServiceDefinitionCopyWithImpl<$Res, ServiceDefinition>;
  @useResult
  $Res call({String id, ServiceType type, String name, String? description});
}

/// @nodoc
class _$ServiceDefinitionCopyWithImpl<$Res, $Val extends ServiceDefinition>
    implements $ServiceDefinitionCopyWith<$Res> {
  _$ServiceDefinitionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ServiceDefinition
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? name = null,
    Object? description = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as ServiceType,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            description: freezed == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ServiceDefinitionImplCopyWith<$Res>
    implements $ServiceDefinitionCopyWith<$Res> {
  factory _$$ServiceDefinitionImplCopyWith(
    _$ServiceDefinitionImpl value,
    $Res Function(_$ServiceDefinitionImpl) then,
  ) = __$$ServiceDefinitionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, ServiceType type, String name, String? description});
}

/// @nodoc
class __$$ServiceDefinitionImplCopyWithImpl<$Res>
    extends _$ServiceDefinitionCopyWithImpl<$Res, _$ServiceDefinitionImpl>
    implements _$$ServiceDefinitionImplCopyWith<$Res> {
  __$$ServiceDefinitionImplCopyWithImpl(
    _$ServiceDefinitionImpl _value,
    $Res Function(_$ServiceDefinitionImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ServiceDefinition
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? name = null,
    Object? description = freezed,
  }) {
    return _then(
      _$ServiceDefinitionImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as ServiceType,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        description: freezed == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ServiceDefinitionImpl implements _ServiceDefinition {
  const _$ServiceDefinitionImpl({
    required this.id,
    required this.type,
    required this.name,
    this.description,
  });

  factory _$ServiceDefinitionImpl.fromJson(Map<String, dynamic> json) =>
      _$$ServiceDefinitionImplFromJson(json);

  @override
  final String id;
  @override
  final ServiceType type;
  @override
  final String name;
  @override
  final String? description;

  @override
  String toString() {
    return 'ServiceDefinition(id: $id, type: $type, name: $name, description: $description)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ServiceDefinitionImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.description, description) ||
                other.description == description));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, type, name, description);

  /// Create a copy of ServiceDefinition
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ServiceDefinitionImplCopyWith<_$ServiceDefinitionImpl> get copyWith =>
      __$$ServiceDefinitionImplCopyWithImpl<_$ServiceDefinitionImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$ServiceDefinitionImplToJson(this);
  }
}

abstract class _ServiceDefinition implements ServiceDefinition {
  const factory _ServiceDefinition({
    required final String id,
    required final ServiceType type,
    required final String name,
    final String? description,
  }) = _$ServiceDefinitionImpl;

  factory _ServiceDefinition.fromJson(Map<String, dynamic> json) =
      _$ServiceDefinitionImpl.fromJson;

  @override
  String get id;
  @override
  ServiceType get type;
  @override
  String get name;
  @override
  String? get description;

  /// Create a copy of ServiceDefinition
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ServiceDefinitionImplCopyWith<_$ServiceDefinitionImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

GeoPoint _$GeoPointFromJson(Map<String, dynamic> json) {
  return _GeoPoint.fromJson(json);
}

/// @nodoc
mixin _$GeoPoint {
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;

  /// Serializes this GeoPoint to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of GeoPoint
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $GeoPointCopyWith<GeoPoint> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $GeoPointCopyWith<$Res> {
  factory $GeoPointCopyWith(GeoPoint value, $Res Function(GeoPoint) then) =
      _$GeoPointCopyWithImpl<$Res, GeoPoint>;
  @useResult
  $Res call({double latitude, double longitude});
}

/// @nodoc
class _$GeoPointCopyWithImpl<$Res, $Val extends GeoPoint>
    implements $GeoPointCopyWith<$Res> {
  _$GeoPointCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of GeoPoint
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? latitude = null, Object? longitude = null}) {
    return _then(
      _value.copyWith(
            latitude: null == latitude
                ? _value.latitude
                : latitude // ignore: cast_nullable_to_non_nullable
                      as double,
            longitude: null == longitude
                ? _value.longitude
                : longitude // ignore: cast_nullable_to_non_nullable
                      as double,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$GeoPointImplCopyWith<$Res>
    implements $GeoPointCopyWith<$Res> {
  factory _$$GeoPointImplCopyWith(
    _$GeoPointImpl value,
    $Res Function(_$GeoPointImpl) then,
  ) = __$$GeoPointImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({double latitude, double longitude});
}

/// @nodoc
class __$$GeoPointImplCopyWithImpl<$Res>
    extends _$GeoPointCopyWithImpl<$Res, _$GeoPointImpl>
    implements _$$GeoPointImplCopyWith<$Res> {
  __$$GeoPointImplCopyWithImpl(
    _$GeoPointImpl _value,
    $Res Function(_$GeoPointImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of GeoPoint
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? latitude = null, Object? longitude = null}) {
    return _then(
      _$GeoPointImpl(
        latitude: null == latitude
            ? _value.latitude
            : latitude // ignore: cast_nullable_to_non_nullable
                  as double,
        longitude: null == longitude
            ? _value.longitude
            : longitude // ignore: cast_nullable_to_non_nullable
                  as double,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$GeoPointImpl implements _GeoPoint {
  const _$GeoPointImpl({required this.latitude, required this.longitude});

  factory _$GeoPointImpl.fromJson(Map<String, dynamic> json) =>
      _$$GeoPointImplFromJson(json);

  @override
  final double latitude;
  @override
  final double longitude;

  @override
  String toString() {
    return 'GeoPoint(latitude: $latitude, longitude: $longitude)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$GeoPointImpl &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, latitude, longitude);

  /// Create a copy of GeoPoint
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$GeoPointImplCopyWith<_$GeoPointImpl> get copyWith =>
      __$$GeoPointImplCopyWithImpl<_$GeoPointImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$GeoPointImplToJson(this);
  }
}

abstract class _GeoPoint implements GeoPoint {
  const factory _GeoPoint({
    required final double latitude,
    required final double longitude,
  }) = _$GeoPointImpl;

  factory _GeoPoint.fromJson(Map<String, dynamic> json) =
      _$GeoPointImpl.fromJson;

  @override
  double get latitude;
  @override
  double get longitude;

  /// Create a copy of GeoPoint
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$GeoPointImplCopyWith<_$GeoPointImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Need _$NeedFromJson(Map<String, dynamic> json) {
  return _Need.fromJson(json);
}

/// @nodoc
mixin _$Need {
  String get id => throw _privateConstructorUsedError;
  String get ownerId => throw _privateConstructorUsedError;
  String get vehicleId => throw _privateConstructorUsedError;
  ServiceType get serviceType => throw _privateConstructorUsedError;
  GeoPoint get location => throw _privateConstructorUsedError;
  DateTime get createdAt => throw _privateConstructorUsedError;
  List<String>? get requiredPhotos => throw _privateConstructorUsedError;
  Map<String, dynamic>? get extra => throw _privateConstructorUsedError;

  /// Serializes this Need to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Need
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NeedCopyWith<Need> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NeedCopyWith<$Res> {
  factory $NeedCopyWith(Need value, $Res Function(Need) then) =
      _$NeedCopyWithImpl<$Res, Need>;
  @useResult
  $Res call({
    String id,
    String ownerId,
    String vehicleId,
    ServiceType serviceType,
    GeoPoint location,
    DateTime createdAt,
    List<String>? requiredPhotos,
    Map<String, dynamic>? extra,
  });

  $GeoPointCopyWith<$Res> get location;
}

/// @nodoc
class _$NeedCopyWithImpl<$Res, $Val extends Need>
    implements $NeedCopyWith<$Res> {
  _$NeedCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Need
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? ownerId = null,
    Object? vehicleId = null,
    Object? serviceType = null,
    Object? location = null,
    Object? createdAt = null,
    Object? requiredPhotos = freezed,
    Object? extra = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            ownerId: null == ownerId
                ? _value.ownerId
                : ownerId // ignore: cast_nullable_to_non_nullable
                      as String,
            vehicleId: null == vehicleId
                ? _value.vehicleId
                : vehicleId // ignore: cast_nullable_to_non_nullable
                      as String,
            serviceType: null == serviceType
                ? _value.serviceType
                : serviceType // ignore: cast_nullable_to_non_nullable
                      as ServiceType,
            location: null == location
                ? _value.location
                : location // ignore: cast_nullable_to_non_nullable
                      as GeoPoint,
            createdAt: null == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            requiredPhotos: freezed == requiredPhotos
                ? _value.requiredPhotos
                : requiredPhotos // ignore: cast_nullable_to_non_nullable
                      as List<String>?,
            extra: freezed == extra
                ? _value.extra
                : extra // ignore: cast_nullable_to_non_nullable
                      as Map<String, dynamic>?,
          )
          as $Val,
    );
  }

  /// Create a copy of Need
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $GeoPointCopyWith<$Res> get location {
    return $GeoPointCopyWith<$Res>(_value.location, (value) {
      return _then(_value.copyWith(location: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$NeedImplCopyWith<$Res> implements $NeedCopyWith<$Res> {
  factory _$$NeedImplCopyWith(
    _$NeedImpl value,
    $Res Function(_$NeedImpl) then,
  ) = __$$NeedImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String ownerId,
    String vehicleId,
    ServiceType serviceType,
    GeoPoint location,
    DateTime createdAt,
    List<String>? requiredPhotos,
    Map<String, dynamic>? extra,
  });

  @override
  $GeoPointCopyWith<$Res> get location;
}

/// @nodoc
class __$$NeedImplCopyWithImpl<$Res>
    extends _$NeedCopyWithImpl<$Res, _$NeedImpl>
    implements _$$NeedImplCopyWith<$Res> {
  __$$NeedImplCopyWithImpl(_$NeedImpl _value, $Res Function(_$NeedImpl) _then)
    : super(_value, _then);

  /// Create a copy of Need
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? ownerId = null,
    Object? vehicleId = null,
    Object? serviceType = null,
    Object? location = null,
    Object? createdAt = null,
    Object? requiredPhotos = freezed,
    Object? extra = freezed,
  }) {
    return _then(
      _$NeedImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        ownerId: null == ownerId
            ? _value.ownerId
            : ownerId // ignore: cast_nullable_to_non_nullable
                  as String,
        vehicleId: null == vehicleId
            ? _value.vehicleId
            : vehicleId // ignore: cast_nullable_to_non_nullable
                  as String,
        serviceType: null == serviceType
            ? _value.serviceType
            : serviceType // ignore: cast_nullable_to_non_nullable
                  as ServiceType,
        location: null == location
            ? _value.location
            : location // ignore: cast_nullable_to_non_nullable
                  as GeoPoint,
        createdAt: null == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        requiredPhotos: freezed == requiredPhotos
            ? _value._requiredPhotos
            : requiredPhotos // ignore: cast_nullable_to_non_nullable
                  as List<String>?,
        extra: freezed == extra
            ? _value._extra
            : extra // ignore: cast_nullable_to_non_nullable
                  as Map<String, dynamic>?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$NeedImpl implements _Need {
  const _$NeedImpl({
    required this.id,
    required this.ownerId,
    required this.vehicleId,
    required this.serviceType,
    required this.location,
    required this.createdAt,
    final List<String>? requiredPhotos,
    final Map<String, dynamic>? extra,
  }) : _requiredPhotos = requiredPhotos,
       _extra = extra;

  factory _$NeedImpl.fromJson(Map<String, dynamic> json) =>
      _$$NeedImplFromJson(json);

  @override
  final String id;
  @override
  final String ownerId;
  @override
  final String vehicleId;
  @override
  final ServiceType serviceType;
  @override
  final GeoPoint location;
  @override
  final DateTime createdAt;
  final List<String>? _requiredPhotos;
  @override
  List<String>? get requiredPhotos {
    final value = _requiredPhotos;
    if (value == null) return null;
    if (_requiredPhotos is EqualUnmodifiableListView) return _requiredPhotos;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  final Map<String, dynamic>? _extra;
  @override
  Map<String, dynamic>? get extra {
    final value = _extra;
    if (value == null) return null;
    if (_extra is EqualUnmodifiableMapView) return _extra;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(value);
  }

  @override
  String toString() {
    return 'Need(id: $id, ownerId: $ownerId, vehicleId: $vehicleId, serviceType: $serviceType, location: $location, createdAt: $createdAt, requiredPhotos: $requiredPhotos, extra: $extra)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NeedImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.ownerId, ownerId) || other.ownerId == ownerId) &&
            (identical(other.vehicleId, vehicleId) ||
                other.vehicleId == vehicleId) &&
            (identical(other.serviceType, serviceType) ||
                other.serviceType == serviceType) &&
            (identical(other.location, location) ||
                other.location == location) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            const DeepCollectionEquality().equals(
              other._requiredPhotos,
              _requiredPhotos,
            ) &&
            const DeepCollectionEquality().equals(other._extra, _extra));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    ownerId,
    vehicleId,
    serviceType,
    location,
    createdAt,
    const DeepCollectionEquality().hash(_requiredPhotos),
    const DeepCollectionEquality().hash(_extra),
  );

  /// Create a copy of Need
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NeedImplCopyWith<_$NeedImpl> get copyWith =>
      __$$NeedImplCopyWithImpl<_$NeedImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$NeedImplToJson(this);
  }
}

abstract class _Need implements Need {
  const factory _Need({
    required final String id,
    required final String ownerId,
    required final String vehicleId,
    required final ServiceType serviceType,
    required final GeoPoint location,
    required final DateTime createdAt,
    final List<String>? requiredPhotos,
    final Map<String, dynamic>? extra,
  }) = _$NeedImpl;

  factory _Need.fromJson(Map<String, dynamic> json) = _$NeedImpl.fromJson;

  @override
  String get id;
  @override
  String get ownerId;
  @override
  String get vehicleId;
  @override
  ServiceType get serviceType;
  @override
  GeoPoint get location;
  @override
  DateTime get createdAt;
  @override
  List<String>? get requiredPhotos;
  @override
  Map<String, dynamic>? get extra;

  /// Create a copy of Need
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NeedImplCopyWith<_$NeedImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Proposal _$ProposalFromJson(Map<String, dynamic> json) {
  return _Proposal.fromJson(json);
}

/// @nodoc
mixin _$Proposal {
  String get id => throw _privateConstructorUsedError;
  String get needId => throw _privateConstructorUsedError;
  String get providerId => throw _privateConstructorUsedError;
  int get cents => throw _privateConstructorUsedError;
  DateTime get createdAt => throw _privateConstructorUsedError;

  /// Serializes this Proposal to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Proposal
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ProposalCopyWith<Proposal> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProposalCopyWith<$Res> {
  factory $ProposalCopyWith(Proposal value, $Res Function(Proposal) then) =
      _$ProposalCopyWithImpl<$Res, Proposal>;
  @useResult
  $Res call({
    String id,
    String needId,
    String providerId,
    int cents,
    DateTime createdAt,
  });
}

/// @nodoc
class _$ProposalCopyWithImpl<$Res, $Val extends Proposal>
    implements $ProposalCopyWith<$Res> {
  _$ProposalCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Proposal
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? needId = null,
    Object? providerId = null,
    Object? cents = null,
    Object? createdAt = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            needId: null == needId
                ? _value.needId
                : needId // ignore: cast_nullable_to_non_nullable
                      as String,
            providerId: null == providerId
                ? _value.providerId
                : providerId // ignore: cast_nullable_to_non_nullable
                      as String,
            cents: null == cents
                ? _value.cents
                : cents // ignore: cast_nullable_to_non_nullable
                      as int,
            createdAt: null == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ProposalImplCopyWith<$Res>
    implements $ProposalCopyWith<$Res> {
  factory _$$ProposalImplCopyWith(
    _$ProposalImpl value,
    $Res Function(_$ProposalImpl) then,
  ) = __$$ProposalImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String needId,
    String providerId,
    int cents,
    DateTime createdAt,
  });
}

/// @nodoc
class __$$ProposalImplCopyWithImpl<$Res>
    extends _$ProposalCopyWithImpl<$Res, _$ProposalImpl>
    implements _$$ProposalImplCopyWith<$Res> {
  __$$ProposalImplCopyWithImpl(
    _$ProposalImpl _value,
    $Res Function(_$ProposalImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Proposal
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? needId = null,
    Object? providerId = null,
    Object? cents = null,
    Object? createdAt = null,
  }) {
    return _then(
      _$ProposalImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        needId: null == needId
            ? _value.needId
            : needId // ignore: cast_nullable_to_non_nullable
                  as String,
        providerId: null == providerId
            ? _value.providerId
            : providerId // ignore: cast_nullable_to_non_nullable
                  as String,
        cents: null == cents
            ? _value.cents
            : cents // ignore: cast_nullable_to_non_nullable
                  as int,
        createdAt: null == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ProposalImpl implements _Proposal {
  const _$ProposalImpl({
    required this.id,
    required this.needId,
    required this.providerId,
    required this.cents,
    required this.createdAt,
  });

  factory _$ProposalImpl.fromJson(Map<String, dynamic> json) =>
      _$$ProposalImplFromJson(json);

  @override
  final String id;
  @override
  final String needId;
  @override
  final String providerId;
  @override
  final int cents;
  @override
  final DateTime createdAt;

  @override
  String toString() {
    return 'Proposal(id: $id, needId: $needId, providerId: $providerId, cents: $cents, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ProposalImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.needId, needId) || other.needId == needId) &&
            (identical(other.providerId, providerId) ||
                other.providerId == providerId) &&
            (identical(other.cents, cents) || other.cents == cents) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, id, needId, providerId, cents, createdAt);

  /// Create a copy of Proposal
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ProposalImplCopyWith<_$ProposalImpl> get copyWith =>
      __$$ProposalImplCopyWithImpl<_$ProposalImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ProposalImplToJson(this);
  }
}

abstract class _Proposal implements Proposal {
  const factory _Proposal({
    required final String id,
    required final String needId,
    required final String providerId,
    required final int cents,
    required final DateTime createdAt,
  }) = _$ProposalImpl;

  factory _Proposal.fromJson(Map<String, dynamic> json) =
      _$ProposalImpl.fromJson;

  @override
  String get id;
  @override
  String get needId;
  @override
  String get providerId;
  @override
  int get cents;
  @override
  DateTime get createdAt;

  /// Create a copy of Proposal
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ProposalImplCopyWith<_$ProposalImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

PaymentSummary _$PaymentSummaryFromJson(Map<String, dynamic> json) {
  return _PaymentSummary.fromJson(json);
}

/// @nodoc
mixin _$PaymentSummary {
  int get serviceCents => throw _privateConstructorUsedError;
  int get platformFeeCents => throw _privateConstructorUsedError;
  int get taxCents => throw _privateConstructorUsedError;

  /// Serializes this PaymentSummary to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PaymentSummaryCopyWith<PaymentSummary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PaymentSummaryCopyWith<$Res> {
  factory $PaymentSummaryCopyWith(
    PaymentSummary value,
    $Res Function(PaymentSummary) then,
  ) = _$PaymentSummaryCopyWithImpl<$Res, PaymentSummary>;
  @useResult
  $Res call({int serviceCents, int platformFeeCents, int taxCents});
}

/// @nodoc
class _$PaymentSummaryCopyWithImpl<$Res, $Val extends PaymentSummary>
    implements $PaymentSummaryCopyWith<$Res> {
  _$PaymentSummaryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? serviceCents = null,
    Object? platformFeeCents = null,
    Object? taxCents = null,
  }) {
    return _then(
      _value.copyWith(
            serviceCents: null == serviceCents
                ? _value.serviceCents
                : serviceCents // ignore: cast_nullable_to_non_nullable
                      as int,
            platformFeeCents: null == platformFeeCents
                ? _value.platformFeeCents
                : platformFeeCents // ignore: cast_nullable_to_non_nullable
                      as int,
            taxCents: null == taxCents
                ? _value.taxCents
                : taxCents // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$PaymentSummaryImplCopyWith<$Res>
    implements $PaymentSummaryCopyWith<$Res> {
  factory _$$PaymentSummaryImplCopyWith(
    _$PaymentSummaryImpl value,
    $Res Function(_$PaymentSummaryImpl) then,
  ) = __$$PaymentSummaryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int serviceCents, int platformFeeCents, int taxCents});
}

/// @nodoc
class __$$PaymentSummaryImplCopyWithImpl<$Res>
    extends _$PaymentSummaryCopyWithImpl<$Res, _$PaymentSummaryImpl>
    implements _$$PaymentSummaryImplCopyWith<$Res> {
  __$$PaymentSummaryImplCopyWithImpl(
    _$PaymentSummaryImpl _value,
    $Res Function(_$PaymentSummaryImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? serviceCents = null,
    Object? platformFeeCents = null,
    Object? taxCents = null,
  }) {
    return _then(
      _$PaymentSummaryImpl(
        serviceCents: null == serviceCents
            ? _value.serviceCents
            : serviceCents // ignore: cast_nullable_to_non_nullable
                  as int,
        platformFeeCents: null == platformFeeCents
            ? _value.platformFeeCents
            : platformFeeCents // ignore: cast_nullable_to_non_nullable
                  as int,
        taxCents: null == taxCents
            ? _value.taxCents
            : taxCents // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$PaymentSummaryImpl implements _PaymentSummary {
  const _$PaymentSummaryImpl({
    required this.serviceCents,
    required this.platformFeeCents,
    required this.taxCents,
  });

  factory _$PaymentSummaryImpl.fromJson(Map<String, dynamic> json) =>
      _$$PaymentSummaryImplFromJson(json);

  @override
  final int serviceCents;
  @override
  final int platformFeeCents;
  @override
  final int taxCents;

  @override
  String toString() {
    return 'PaymentSummary(serviceCents: $serviceCents, platformFeeCents: $platformFeeCents, taxCents: $taxCents)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PaymentSummaryImpl &&
            (identical(other.serviceCents, serviceCents) ||
                other.serviceCents == serviceCents) &&
            (identical(other.platformFeeCents, platformFeeCents) ||
                other.platformFeeCents == platformFeeCents) &&
            (identical(other.taxCents, taxCents) ||
                other.taxCents == taxCents));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, serviceCents, platformFeeCents, taxCents);

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PaymentSummaryImplCopyWith<_$PaymentSummaryImpl> get copyWith =>
      __$$PaymentSummaryImplCopyWithImpl<_$PaymentSummaryImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$PaymentSummaryImplToJson(this);
  }
}

abstract class _PaymentSummary implements PaymentSummary {
  const factory _PaymentSummary({
    required final int serviceCents,
    required final int platformFeeCents,
    required final int taxCents,
  }) = _$PaymentSummaryImpl;

  factory _PaymentSummary.fromJson(Map<String, dynamic> json) =
      _$PaymentSummaryImpl.fromJson;

  @override
  int get serviceCents;
  @override
  int get platformFeeCents;
  @override
  int get taxCents;

  /// Create a copy of PaymentSummary
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PaymentSummaryImplCopyWith<_$PaymentSummaryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
