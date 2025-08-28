// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$AppUserImpl _$$AppUserImplFromJson(Map<String, dynamic> json) =>
    _$AppUserImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      role: $enumDecode(_$UserRoleEnumMap, json['role']),
      phone: json['phone'] as String?,
      rating: (json['rating'] as num?)?.toDouble(),
    );

Map<String, dynamic> _$$AppUserImplToJson(_$AppUserImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'email': instance.email,
      'role': _$UserRoleEnumMap[instance.role]!,
      'phone': instance.phone,
      'rating': instance.rating,
    };

const _$UserRoleEnumMap = {
  UserRole.owner: 'owner',
  UserRole.provider: 'provider',
  UserRole.admin: 'admin',
};

_$VehicleImpl _$$VehicleImplFromJson(Map<String, dynamic> json) =>
    _$VehicleImpl(
      id: json['id'] as String,
      ownerId: json['ownerId'] as String,
      plate: json['plate'] as String,
      model: json['model'] as String,
      make: json['make'] as String,
      year: (json['year'] as num?)?.toInt(),
    );

Map<String, dynamic> _$$VehicleImplToJson(_$VehicleImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'ownerId': instance.ownerId,
      'plate': instance.plate,
      'model': instance.model,
      'make': instance.make,
      'year': instance.year,
    };

_$ServiceDefinitionImpl _$$ServiceDefinitionImplFromJson(
  Map<String, dynamic> json,
) => _$ServiceDefinitionImpl(
  id: json['id'] as String,
  type: $enumDecode(_$ServiceTypeEnumMap, json['type']),
  name: json['name'] as String,
  description: json['description'] as String?,
);

Map<String, dynamic> _$$ServiceDefinitionImplToJson(
  _$ServiceDefinitionImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'type': _$ServiceTypeEnumMap[instance.type]!,
  'name': instance.name,
  'description': instance.description,
};

const _$ServiceTypeEnumMap = {
  ServiceType.carPickup: 'carPickup',
  ServiceType.expressWash: 'expressWash',
  ServiceType.delivery: 'delivery',
};

_$GeoPointImpl _$$GeoPointImplFromJson(Map<String, dynamic> json) =>
    _$GeoPointImpl(
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
    );

Map<String, dynamic> _$$GeoPointImplToJson(_$GeoPointImpl instance) =>
    <String, dynamic>{
      'latitude': instance.latitude,
      'longitude': instance.longitude,
    };

_$NeedImpl _$$NeedImplFromJson(Map<String, dynamic> json) => _$NeedImpl(
  id: json['id'] as String,
  ownerId: json['ownerId'] as String,
  vehicleId: json['vehicleId'] as String,
  serviceType: $enumDecode(_$ServiceTypeEnumMap, json['serviceType']),
  location: GeoPoint.fromJson(json['location'] as Map<String, dynamic>),
  createdAt: DateTime.parse(json['createdAt'] as String),
  requiredPhotos: (json['requiredPhotos'] as List<dynamic>?)
      ?.map((e) => e as String)
      .toList(),
  extra: json['extra'] as Map<String, dynamic>?,
);

Map<String, dynamic> _$$NeedImplToJson(_$NeedImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'ownerId': instance.ownerId,
      'vehicleId': instance.vehicleId,
      'serviceType': _$ServiceTypeEnumMap[instance.serviceType]!,
      'location': instance.location,
      'createdAt': instance.createdAt.toIso8601String(),
      'requiredPhotos': instance.requiredPhotos,
      'extra': instance.extra,
    };

_$ProposalImpl _$$ProposalImplFromJson(Map<String, dynamic> json) =>
    _$ProposalImpl(
      id: json['id'] as String,
      needId: json['needId'] as String,
      providerId: json['providerId'] as String,
      cents: (json['cents'] as num).toInt(),
      createdAt: DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$$ProposalImplToJson(_$ProposalImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'needId': instance.needId,
      'providerId': instance.providerId,
      'cents': instance.cents,
      'createdAt': instance.createdAt.toIso8601String(),
    };

_$PaymentSummaryImpl _$$PaymentSummaryImplFromJson(Map<String, dynamic> json) =>
    _$PaymentSummaryImpl(
      serviceCents: (json['serviceCents'] as num).toInt(),
      platformFeeCents: (json['platformFeeCents'] as num).toInt(),
      taxCents: (json['taxCents'] as num).toInt(),
    );

Map<String, dynamic> _$$PaymentSummaryImplToJson(
  _$PaymentSummaryImpl instance,
) => <String, dynamic>{
  'serviceCents': instance.serviceCents,
  'platformFeeCents': instance.platformFeeCents,
  'taxCents': instance.taxCents,
};
